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


module.exports = {
  register,
  login,getUser,
  
};
