let mongoose = require("mongoose");

const cardsCheking = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    paymentStatus: String,
  },
  { timestamps: true }
);

let cardsChekingscheme = mongoose.model("cardsCheking", cardsCheking);

module.exports = cardsChekingscheme;
