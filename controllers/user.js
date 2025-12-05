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

module.exports = {
  getUser,
  getOwnedbooks,
  getLentbooks,
  getRentedbooks,
  rentabook,
};
