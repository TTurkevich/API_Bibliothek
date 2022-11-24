const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.get("/", getBooks);
router.get("/:bookId", getBook);
router.post("/", createBook);
router.patch("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

module.exports = router;
