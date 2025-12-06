const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: ReasonPhrases.NOT_FOUND });
};

module.exports = notFound;
