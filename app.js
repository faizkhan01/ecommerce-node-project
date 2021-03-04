const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const authenticationRouter = require("./routes/authentication");

// Database Connection Object
const { connectDB } = require('./db/dbConnection');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Route Configuration

app.use("/", authenticationRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", orderRouter);

//Database Connection

connectDB();

//Handle Unknown Path
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

// error handler

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message || err);
});

module.exports = app;
