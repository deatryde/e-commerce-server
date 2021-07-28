const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { isEmpty } = require("lodash");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.find({ userId });
    if (isEmpty(carts)) {
      return res.send({ products: [] });
    }
    let retreiveCart;
    carts.forEach((cart) => {
      if (!cart.fulfilled) {
        retreiveCart = cart;
      }
    });
    let products = [];
    let result;
    if (!isEmpty(retreiveCart)) {
      products = retreiveCart.products.map(
        async (product) => await Product.findById({ _id: product })
      );
      products = await Promise.all(products);
      result = { ...retreiveCart.toJSON(), products };
    }
    res.send({ result });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;
    const product = req.body.product;
    const cart = await Cart.updateMany(
      { _id: cartId },
      { $pullAll: { products: [product] } }
    );
    res.send({ cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    let cart, unfulfiledCart;
    const carts = await Cart.find({ userId });
    const hasValidCarts = carts.reduce((acc, value) => {
      if (!value.fulfilled) {
        unfulfiledCart = value;
      }
      return acc && value.fulfilled;
    }, true);
    if (hasValidCarts) {
      cart = new Cart({ userId, products });
      cart = await cart.save();
    } else {
      const stringProduct = [...unfulfiledCart.products, ...products].map(
        (product) => product.toString()
      );
      const newProducts = Array.from(new Set(stringProduct));
      cart = await Cart.findByIdAndUpdate(
        { _id: unfulfiledCart._id },
        { products: newProducts }
      );
    }
    let value = cart.products.map(async (id) => await Product.findById(id));
    value = await Promise.all(value);
    res.send({ ...cart.toJSON(), products: value });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
