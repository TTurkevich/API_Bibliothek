let users = require("../data/users.json");
const { newId } = require("../helpers");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === id);
    resolve(user);
  });
}

function findByName(name) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.name === name);
    resolve(user);
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { id: newId(), ...user };
    users.push(newUser);
    writeDataToFile("./src/data/users.json", users);
    resolve(newUser);
  });
}

function update(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((u) => u.id === id);
    users[index] = { id, ...user };
    writeDataToFile("./src/data/users.json", users);
    resolve(users[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    users = users.filter((u) => u.id !== id);
    writeDataToFile("./src/data/users.json", users);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  remove,
};
