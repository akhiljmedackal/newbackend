const express = require("express");
const User = require("../models/user");
const Order = require("../models/order");
const { Product } = require("../models/product");
const employeeRouter = express.Router();
const auth = require("../middlewares/auth");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

employeeRouter.post(
  "/newProduct/register",
  upload.single("image"),
  auth,
  async (req, res) => {
    try {
      const { name, price, category, stock, services } = req.body;

      const product = await Product.findOne({ name });
      if (!product) {
        addProduct = new Product({
          name,
          price,
          category,
          stock,
          image: `https://campus-in-service.herokuapp.com/${req.file.originalname}`,
          services,
        });
        await addProduct.save();
        res.status(200).json({ msg: "Item added Successfully" });
      } else return res.status(400).json({ msg: "Product Already Exists!!!" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

employeeRouter.delete("/product/remove/:name", auth, async (req, res) => {
  try {
    const { name } = req.params;

    let product = await Product.findOne({ name });
    if (!product) {
      return res.status(400).json({ msg: "Product does not exist!!!" });
    }
    product = await Product.findByIdAndRemove(product._id);
    res.status(200).json({ msg: "Product Removed!!!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

employeeRouter.get("/orderDetails", auth, async (req, res) => {
  try {
    const order = await Order.find({});
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = employeeRouter;
