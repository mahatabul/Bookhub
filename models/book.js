const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    edition: {
      type: Number,
      default: 0,
    },
    publication: {
      type: String,
      default: "",
    },
    year: {
      type: Number,
      default: 0,
    },
    bookRating: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 5,
    },
    ownerList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lenderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    genre: { type: String },
    description: { type: String },
    coverImage: { type: String },

    availableForRent: {
      type: Boolean,
      default: true,
    },
    availableForTrade: {
      type: Boolean,
      default: true,
    },
    rentPrice: {
      type: Number,
      default: 0,
    },
    rentalDurationdays: {
      type: Number,
      default: 30,
      min: 1,
      max: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
