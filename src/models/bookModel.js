let books = require("../data/books.json");
const { newId } = require("../helpers");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const book = books.find((b) => b.id === id);
    resolve(book);
  });
}

function create(book) {
  return new Promise((resolve, reject) => {
    const newBook = { id: newId(), ...book };
    books.push(newBook);
    writeDataToFile("./src/data/books.json", books);
    resolve(newBook);
  });
}

function update(id, book) {
  return new Promise((resolve, reject) => {
    const index = books.findIndex((b) => b.id === id);
    books[index] = { id, ...book };
    writeDataToFile("./src/data/books.json", books);
    resolve(books[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    books = books.filter((b) => b.id !== id);
    writeDataToFile("./src/data/books.json", books);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
