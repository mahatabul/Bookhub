const getBook = async (req, res) => {
  res.send("Get Book info");
};

const getOwnerlist = async (req, res) => {
  res.send("Shows Owner who own this Book in detail");
};

const getLentnumbers = async (req, res) => {
  res.send("Shows how many people rented this book");
};

module.exports = {
  getBook,
  getOwnerlist,
  getLentnumbers,
};
