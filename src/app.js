const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const booksRoute = require("./routes/books");
const loggerReqURL = require("./middlewares/loggerReqURL");

dotenv.config();

const { PORT, API_URL, MONGO_URL } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(loggerReqURL);
app.use("/users", usersRoute);
app.use("/books", booksRoute);

app.get("/", async (req, res) => {
  res.status(200);
  res.send("Нello, Reader!");
});

app.get("/*", async (req, res) => {
  res.send("Page not found");
  res.status(404);
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDb");
    app.listen(PORT);
    console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
  } catch (err) {
    console.log(err);
  }
};

start();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Приложение завершило работу");
  process.exit();
});
