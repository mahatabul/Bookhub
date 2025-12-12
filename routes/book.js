const express = require("express");
const router = express.Router();

const auth = require("../middleware/authentication");

const {
  getBook,
  getBookById,
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
} = require("../controllers/book");

router.get("/all", getallBooks);
router.get("/search", getBookbyName);
router.get("/:id", getBookById);


router.get("/sort/:order", sortByPrice);

router.get("/price/:lowprice/:highprice", getsortBookbyprice);

router.get("/:id/owners", getOwnerlist);

router.get("/:id/lenders", getLentnumbers);

router.use(auth);

router.post("/upload", uploadabook);

router.post("/:id/rent", rentabook);

router.get("/me/owned", getOwnedbooks);
router.get("/me/lent", getLentbooks);
router.get("/me/rented", getRentedbooks);

module.exports = router;
