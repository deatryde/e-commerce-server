const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema(
  {
    product: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    fulfilled: {
      type: Booleon,
      default: false,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
