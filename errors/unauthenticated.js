const { StatusCodes } = require("http-status-codes");
const customerror = require("./customerror");

class unauthenticated extends customerror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unauthenticated;
