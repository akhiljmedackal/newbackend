const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const employeeRouter = require("./routes/employee");
const cors = require("cors");
const DB = process.env.URL;
const PORT = process.env.PORT;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors());
app.use(express.static(__dirname + "/images"));
app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(employeeRouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
