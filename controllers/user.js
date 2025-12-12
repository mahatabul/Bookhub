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
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badrequest("Bad request provide email or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new unauthenticated("No such user");
  }
  const isPasswordcorrect = await user.comparepassword(password);
  if (!isPasswordcorrect) {
    throw new unauthenticated("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const getUser = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById({ userId }).select("-password");
  if (!user) {
    throw new notFound("No user found");
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  register,
  login,
  getUser,
};
