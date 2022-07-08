const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth/");
const userRouter = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
