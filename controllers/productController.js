const Product = require("../src/models/productsModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const newPoduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: { product: newPoduct },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
exports.getOneProduct = async (req, res) => {
  // { $regex: title, $options: 'i' }: This performs a case-insensitive search ($options: 'i' makes the search case-insensitive).
  try {
    const { title } = req.params;
    // const product = await Product.findOne({ title });
    // if (!product) {
    //   return res.status(404).json({ error: "no product found" });
    // }
    const products = await Product.find({
      title: { $regex: title, $options: "i" },
    });
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.status(200).json({
      status: "success",
      data: { products },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { title } = req.params;
    const product = await Product.findOneAndUpdate({ title: title }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ error: "no product found" });
    }
    res.status(200).json({ status: "success", data: { product } });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { title } = req.params;
    const product = await Product.findOneAndDelete({ title });
    if (!product) {
      return res.status(404).json({ error: "no product found" });
    }
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};
