const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    phone: { type: String },
    address: { type: String },
    profileimage: { type: String },

    booksowns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    bookslended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    booksRented: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    userRating: { type: Number, default: 0.0, min: 0, max: 5 },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(7);
  const pass = await bcrypt.hash(this.password, salt);

  this.password = pass;
});

userSchema.methods.comparepassword = async function (pass) {
  const match = await bcrypt.compare(pass, this.password);
  return match;
};
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model("User", userSchema);
