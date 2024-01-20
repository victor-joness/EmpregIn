const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
require("dotenv").config();

//ROUTES

const users = require("./routes/users");
const register = require("./routes/register");
const login = require("./routes/login");

//MIDLEWARES
app.use(express.json());
app.use(cors());

//ENDPOINTS -> http://localhost:5005/api/{name}
app.use("/api/users", users);
app.use("/api/register", register);
app.use("/api/login", login);

//Multer Storage, usado para upload de imgs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

//Mensagem default
app.get("/", (req, res) => {
  res.send("Welcome the api EmpregIn");
});

module.exports = app;
