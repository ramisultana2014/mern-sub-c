const express = require("express");

const authController = require("../../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/activatTheAccount", authController.activateUserAccount);
router.post("/requestnewcode", authController.requestnewCode);
router.post("/login", authController.login);
router.post("/forgetPassword", authController.ForgetPassword);
router.post("/resetPassword", authController.resetPassword);
// iwill send the user email (which i save with redux)in frontend each time  calling  url with protectedRoute
// router.use(authController.protectedRoute);
// router.use(authController.restrictTo);
router.get(
  "/getAllUsersByAdmin",
  authController.protectedRoute,
  authController.restrictTo,
  // eslint-disable-next-line prettier/prettier
  authController.getAllUsersByAdmin
);
module.exports = router;
