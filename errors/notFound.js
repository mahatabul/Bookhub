const { StatusCodes } = require("http-status-codes");
const customerror = require("./customerror");

class notFound extends customerror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFound;
