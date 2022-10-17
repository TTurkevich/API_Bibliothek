const http = require("http");

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./controllers/bookController");
const {
  getUserBooks,
  getUserBookById,
  updateUserBooks,
  deleteUserBook,
} = require("./controllers/userBooksController");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/userController");

const routing = {
  "/books": {
    GET: getBooks,
    POST: createBook,
  },
  "/books/?id=": {
    GET: getBook,
    PUT: updateBook,
    DELETE: deleteBook,
  },
  "/users": {
    GET: getUsers,
    POST: createUser,
  },
  "/users/?id=": {
    GET: getUser,
    PUT: updateUser,
    DELETE: deleteUser,
  },
  "/users/?id=&books": {
    GET: getUserBooks,
  },
  "/users/?id=&books=": {
    GET: getUserBookById,
    POST: updateUserBooks,
    DELETE: deleteUserBook,
  },
};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  let route;
  url.includes("?id=") ? (route = url.replace(/[0-9]/g, "")) : (route = url);
  const entity = routing[route];
  if (!entity) return res.end("Not found");
  const handler = entity[method];
  if (!handler) return res.end("Not found");
  const src = handler.toString();
  const signature = src.substring(0, src.indexOf(")"));
  const args = [req, res];
  if (signature.includes("url")) args.push(url);
  const result = await handler(...args);
  res.end(JSON.stringify(result));
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on("error", (err) => {
  if (err.code === "EACCES") {
    console.log(`No access to port: ${PORT} `);
  }
});

module.exports = server;
