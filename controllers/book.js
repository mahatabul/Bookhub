const {
  badrequest,
  notFound,
  unauthenticated,
  customerror,
} = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const { User, Book } = require("../models/");

const getBook = async (req, res) => {
  const name = req.body;
  const books = await Book.find({ name: name });

  res.status(StatusCodes.OK).json({ books });
};
const getallBooks = async (req, res) => {
  const name = req.body;
  const books = await Book.find().limit(30);

  res.status(StatusCodes.OK).json({ books });
};

const getBookbyName = async (req, res) => {
  const name = req.body;
  const books = await Book.find({ name: name });

  res.status(StatusCodes.OK).json({ books, count: book.length });
};

const getsortBookbyprice = async (req, res) => {
  const low = Number(req.params.lowprice) || 0;
  const high = Number(req.params.highprice) || 4000;

  const books = await Book.find({
    rentPrice: { $gte: low, $lte: high }
  })
    .sort({ rentPrice: 1 })
    .limit(30);

  res.status(StatusCodes.OK).json({ books });
};


const sortByPrice = async (req, res) => {
  const order = req.params.order;
  const ascending = order == 1 ? 1 : -1;
  const books = await Book.find().sort({ rentPrice: ascending }).limit(30);
  res.status(StatusCodes.OK).json({ books: books });
};
const getOwnerlist = async (req, res) => {
  const {
    params: { id: bookId },
  } = req;
  const book = await Book.findById(bookId).select("ownerList");
  if (!book) {
    throw new notFound("No such book found");
  }

  res
    .status(StatusCodes.OK)
    .json({ owners: book.ownerList, count: book.ownerList.length });
};

const getLentnumbers = async (req, res) => {
  res.send("Shows how many people rented this book");
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
  getBook,
  getBookbyName,
  getallBooks,
  getsortBookbyprice,
  sortByPrice,
  getOwnerlist,
  getLentnumbers,
  uploadabook,
  getOwnedbooks,
  getLentbooks,
  getRentedbooks,
  rentabook,
};
