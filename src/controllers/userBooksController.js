const UserBooks = require("../models/userBooksModel");

const { getPostData } = require("../utils");

// @desc    Gets All User Books
// @route   GET /api/users/?name=name&books
async function getUserBooks(req, res, name) {
  try {
    const userBooks = await UserBooks.findAllUserBooks(name);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userBooks));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single User book
// @route   GET /api/users/?name=name&books=id
async function getUserBookById(req, res, name, id) {
  try {
    const userBooks = await UserBooks.findUserBookById(name, id);

    if (!userBooks) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userBooks));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a User Books
// @route   POST /api/users/?name=name&books=id
async function updateUserBooks(req, res, name, id) {
  try {
    const userBooks = await UserBooks.addBook(name, id);

    if (!userBooks) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userBooks));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete User Book
// @route   DELETE /api/users/?name=name&books=id
async function deleteUserBook(req, res, name, id) {
  try {
    const userBook = await UserBooks.findUserBookById(name, id);

    if (!userBook) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      await UserBooks.removeBook(name, id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Book ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUserBooks,
  getUserBookById,
  updateUserBooks,
  deleteUserBook,
};
