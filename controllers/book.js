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
    rentPrice: { $gte: low, $lte: high },
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
  const {
    params: { id: bookId },
  } = req;
  const book = await Book.findById(bookId).select("lenderList");
  if (!book) {
    throw new notFound("No such book found");
  }

  res
    .status(StatusCodes.OK)
    .json({ owners: book.lenderList, count: book.lenderList.length });
};

const getOwnedbooks = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId)
    .populate("booksowns");

  res.status(200).json({ count: user.booksowns.length, books: user.booksowns });
};


const getLentbooks = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId)
    .populate({
      path: "bookslended",
      populate: { path: "currentRenter", select: "name email" }
    });

  res.status(200).json({ count: user.bookslended.length, books: user.bookslended });
};


const getRentedbooks = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId)
    .populate("booksRented");

  res.status(200).json({ count: user.booksRented.length, books: user.booksRented });
};


const rentabook = async (req, res) => {
  const userId = req.user.userId;
  const { id: bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ msg: "Book not found" });
  }

  if (book.owner.toString() === userId) {
    return res.status(400).json({ msg: "You cannot rent your own book" });
  }

  if (book.currentRenter) {
    return res.status(400).json({ msg: "Book is already rented" });
  }

  book.currentRenter = userId;

  if (!book.lenderList.includes(userId)) {
    book.lenderList.push(userId);
  }

  await book.save();

  await User.findByIdAndUpdate(userId, {
    $push: { booksRented: bookId },
  });

  await User.findByIdAndUpdate(book.owner, {
    $push: { bookslended: bookId },
  });

  res.status(200).json({ msg: "Book rented successfully", book });
};

const uploadabook = async (req, res) => {
  const userId = req.user.userId;

  const {
    title,
    author,
    edition,
    publication,
    year,
    genre,
    description,
    coverImage,
    rentPrice,
  } = req.body;

  if (!title || !author || !edition || !genre || !rentPrice) {
    throw new badrequest("Bad Request");
  }

  const book = await Book.create({
    title,
    author,
    edition,
    publication,
    year,
    genre,
    description,
    coverImage,
    rentPrice,
    owner: userId,
  });

  // push into user.booksowns
  await User.findByIdAndUpdate(userId, {
    $push: { booksowns: book._id },
  });

  res.status(StatusCodes.CREATED).json({ msg: "Book uploaded", book });
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
