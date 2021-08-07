const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { isEmpty } = require("lodash");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

router.post("/", auth, async (req, res) => {
  try {
    const { cart, total, token } = req.body;
    console.log(cart);
    console.log(total, token);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
