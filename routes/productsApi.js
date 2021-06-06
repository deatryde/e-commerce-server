const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");

//Get all Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Getting Specific Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product was Not Found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Adding new Product
router.post(
  "/",
  [
    auth,
    [
      body("name", "Name is Required").not().isEmpty(),
      body("description", "Description is Required").not().isEmpty(),
      body("category", "Category is Required").not().isEmpty(),
      body("price", "Price is Required").not().isEmpty(),
      body("quantity", "Quantity is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description, category, price, quantity } = req.body;
      const newProduct = new Product({
        userId: req.user.id,
        name,
        description,
        category,
        price,
        quantity,
      });
      const product = await newProduct.save();
      res.json({ product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
