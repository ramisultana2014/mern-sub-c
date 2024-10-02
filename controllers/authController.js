const bcrypt = require("bcryptjs");

const User = require("../src/models/usersModel");

const sendWelcomeEmail = require("../src/emails/email");
const sendLinkPassword = require("../src/emails/passwordEmail");

const codegenerator = () =>
  Math.floor(100000 + Math.random() * 9000).toString();
exports.signUp = async (req, res) => {
  const verificationCode = codegenerator();
  //create user
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      throw new Error("user already exist");
    }
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      verificationCode,
    });

    newUser.password = undefined;
    sendWelcomeEmail(newUser.email, newUser.name, verificationCode);
    res.status(201).json({
      message: "please check your email",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.activateUserAccount = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("please singup or login");
    }

    const expirationTime = new Date(user.updatedAt).getTime() + 10 * 60 * 1000;

    if (
      user.verificationCode === req.body.verificationCode &&
      Date.now() < expirationTime
    ) {
      user.isVerified = true;
      await user.save({ validateBeforeSave: false });
      res.status(200).json({ status: "success", data: user });
    } else {
      throw new Error(
        "verification failed please reset your password or request new code"
      );
    }
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
exports.requestnewCode = async (req, res) => {
  const verificationCode = codegenerator();
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("please singup or login");
    }
    user.verificationCode = verificationCode;
    await user.save({ validateBeforeSave: false });
    sendWelcomeEmail(req.body.email, req.body.name, verificationCode);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("login", email);
    if (!email || !password) {
      throw new Error("please provide email and password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("unable to login");
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      throw new Error("wrong credential");
    }
    if (!user.isVerified) {
      throw new Error("please check your email to Activate your account,");
    }
    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please provide email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "please signup first" });
    }
    const url = "https://sub-c-byrami.netlify.app/resetpassword";
    sendLinkPassword(email, url);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.protectedRoute = async (req, res, next) => {
  // iwill put the email(which i save with redux) in frontend  when calling the url with protectedRoute
  try {
    const email = req.headers.authorization.split(" ")[1].slice(1, -1);
    //console.log("protect", email);
    if (!email) {
      return res.status(400).json({ error: "Please provide email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "please login first" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "please check email to active your account" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({ error: "Please provide credintals" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "you are not signup yet" });
    }
    user.password = password;
    await user.save({ validateBeforeSave: false });
    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.restrictTo = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("you dont have permission");
    }
  } catch (error) {
    res.status(401).send({ error: error.message });
    return;
  }

  next();
};
exports.getAllUsersByAdmin = async (req, res) => {
  try {
    const users = await User.find().populate("userOrders");
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// 400 for bad requests (missing email or password).
// 401 for unauthorized access (invalid login credentials).
// 403 for forbidden access (account not activated).
// 500 for internal server errors.
