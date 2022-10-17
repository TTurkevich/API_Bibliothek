const User = require("../models/userModel");

const { getPostData } = require("../utils");

// @desc    Gets All Users
// @route   GET /users
async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a User
// @route   POST /users
async function createUser(req, res) {
  try {
    const body = await getPostData(req);

    const { name } = JSON.parse(body);

    const user = {
      name,
    };

    const newUser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single User
// @route   GET /users/?id=
async function getUser(req, res, url) {
  try {
    const id = url.split("id=")[1];
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a User
// @route   PUT /users/?id=
async function updateUser(req, res, url) {
  try {
    const id = url.split("id=")[1];
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name } = JSON.parse(body);

      const userData = {
        name: name || user.name,
      };

      const updUser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete User
// @route   DELETE /users/?id=
async function deleteUser(req, res, url) {
  try {
    const id = url.split("id=")[1];
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
