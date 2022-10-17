const UserBooks = require("../models/userBooksModel");
const { getPostData } = require("../utils");

// @desc    Gets All User Books
// @route   GET /users/?id=id&books
async function getUserBooks(req, res, url) {
  try {
    const id = url.replace(/[^0-9]/g, "");
    const userBooks = await UserBooks.findAllUserBooks(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userBooks));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single User book
// @route   GET /users/?id=id&books=id
async function getUserBookById(req, res, url) {
  try {
    const [route, search] = url.split("id=");
    const [idUser, idBook] = search.split("&books=");
    const userBooks = await UserBooks.findUserBookById(idUser, idBook);

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
// @route   POST /users/?id=id&books=id
async function updateUserBooks(req, res, url) {
  try {
    const [route, search] = url.split("id=");
    const [idUser, idBook] = search.split("&books=");
    const userBooks = await UserBooks.addBook(idUser, idBook);

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
// @route   DELETE /users/?id=id&books=id
async function deleteUserBook(req, res, url) {
  try {
    const [route, search] = url.split("id=");
    const [idUser, idBook] = search.split("&books=");
    const userBook = await UserBooks.findUserBookById(idUser, idBook);

    if (!userBook) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      await UserBooks.removeBook(idUser, idBook);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Book ${idBook} removed` }));
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
