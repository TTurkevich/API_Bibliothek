const Book = require("../models/book");

const getBooks = async (req, res) => {
  await Book.find({})
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getBook = async (req, res) => {
  const { bookId } = req.params;
  await Book.findById(bookId)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createBook = async (req, res) => {
  const data = req.body;
  await Book.create(data)
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const data = req.body;
  await Book.findByIdAndUpdate(bookId, data, { new: true, runValidators: true })
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  await Book.findByIdAndDelete(bookId)
    .then((book) => {
      res.status(200).send("Done");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};
module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
