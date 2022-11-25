const User = require("../models/user");

const getUsers = async (req, res) => {
  await User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  await User.findById(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createUser = async (req, res) => {
  const data = req.body;
  await User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId)
    .then((user) => {
      res.status(200).send("Done");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const addBookToUser = async (req, res) => {
  const { userId, bookId } = req.params;

  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { books: bookId } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const deleteBookFromUser = async (req, res) => {
  const { userId, bookId } = req.params;

  await User.findByIdAndUpdate(
    userId,
    { $pullAll: { books: [{ _id: bookId }] } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addBookToUser,
  deleteBookFromUser,
};
