const {
  badrequest,
  notFound,
  unauthenticated,
  customerror,
} = require("../errors/index");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    throw new badrequest(
      "Bad request provide name, email,password,phone,address"
    );
  }
  const user = await User.create({ name, email, password, phone, address });
  const token = User.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  res.send("Get user info");
};
const getUser = async (req, res) => {
  res.send("Get user info");
};

const getOwnedbooks = async (req, res) => {
  res.send("Shows Owned Books by user in detail");
};

const getLentbooks = async (req, res) => {
  res.send("Shows Lent Books by user in detail");
};

const getRentedbooks = async (req, res) => {
  res.send("Shows Rented Books by user in detail");
};

const rentabook = async (req, res) => {
  res.send("Rent a Book by users in detail");
};
const uploadabook = async (req, res) => {
  res.send("Rent a Book by users in detail");
};

module.exports = {
  register,
  login,
  uploadabook,
  getUser,
  getOwnedbooks,
  getLentbooks,
  getRentedbooks,
  rentabook,
};
