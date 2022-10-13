let users = require("../data/users.json");
let books = require("../data/books.json");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

function findAllUserBooks(name) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.name === name);
    const userBooks = user.books;
    resolve(userBooks);
  });
}

function findUserBookById(name, id) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.name === name);
    const userBooks = user.books;
    const book = userBooks.find((b) => b.id === id);
    resolve(book);
  });
}

function addBook(name, id) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.name === name);
    const userBooks = user.books; //книги пользователя
    const book = books.find((b) => b.id === id); //книга в базе
    userBooks.push(book);
    writeDataToFile("./src/data/users.json", users);
    resolve(userBooks);
  });
}

function removeBook(name, id) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.name === name);
    let userBooks = user.books; //книги пользователя
    userBooks = userBooks.filter((b) => b.id !== id);
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
