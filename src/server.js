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
  getUserByName,
} = require("./controllers/userController");

const server = http.createServer((req, res) => {
  const currentUrl = new URL(req.url, "http://127.0.0.1");
  const params = currentUrl.searchParams;
  const userName = params.get("name");
  const userBooks = params.has("books");
  const bookId = params.get("books");

  if (req.url === "/api/books" && req.method === "GET") {
    getBooks(req, res);
  } else if (req.url.match(/\/api\/books\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getBook(req, res, id);
  } else if (req.url === "/api/books" && req.method === "POST") {
    createBook(req, res);
  } else if (req.url.match(/\/api\/books\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateBook(req, res, id);
  } else if (req.url.match(/\/api\/books\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteBook(req, res, id);
  } else if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  } else if (userName && !userBooks && req.method === "GET") {
    getUserByName(req, res, userName);
  } else if (userName && userBooks && !bookId && req.method === "GET") {
    getUserBooks(req, res, userName);
  } else if (userBooks && bookId && req.method === "GET") {
    getUserBookById(req, res, userName, bookId);
  } else if (userBooks && bookId && req.method === "POST") {
    updateUserBooks(req, res, userName, bookId);
  } else if (userBooks && bookId && req.method === "DELETE") {
    deleteUserBook(req, res, userName, bookId);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message:
          "Route Not Found: Please use the api/books or api/users endpoint",
      })
    );
  }
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
