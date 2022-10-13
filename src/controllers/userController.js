const User = require("../models/userModel");

const { getPostData } = require("../utils");

// @desc    Gets All Users
// @route   GET /api/users
async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single User
// @route   GET /api/users/:id
async function getUser(req, res, id) {
  try {
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

// @desc    Create a User
// @route   POST /api/users
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

// @desc    Update a User
// @route   PUT /api/users/:id
async function updateUser(req, res, id) {
  try {
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
// @route   DELETE /api/users/:id
async function deleteUser(req, res, id) {
  try {
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

// @desc    Gets Single User
// @route   GET /api/users/?name
async function getUserByName(req, res, name) {
  try {
    const user = await User.findByName(name);

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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByName,
};
