let users = require("../data/users.json");
let books = require("../data/books.json");

const { writeDataToFile } = require("../utils");

function findAllUserBooks(userId) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === userId);
    const userBooks = user.books;
    resolve(userBooks);
  });
}

function findUserBookById(idUser, idBook) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === idUser);
    const userBooks = user.books;
    const book = userBooks.find((b) => b.id === idBook);
    resolve(book);
  });
}

function addBook(idUser, idBook) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === idUser);
    const userBooks = user.books;
    const book = books.find((b) => b.id === idBook);
    userBooks.push(book);
    writeDataToFile("./src/data/users.json", users);
    resolve(userBooks);
  });
}

function removeBook(idUser, idBook) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === idUser);
    let userBooks = user.books;
    userBooks = userBooks.filter((b) => b.id !== idBook);
    writeDataToFile("./src/data/users.json", users);
    resolve();
  });
}

module.exports = {
  findAllUserBooks,
  findUserBookById,
  addBook,
  removeBook,
};
