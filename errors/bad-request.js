const { StatusCodes } = require("http-status-codes");
const customerror = require("./customerror");

class badrequest extends customerror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = badrequest;
