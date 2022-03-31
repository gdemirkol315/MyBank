const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts")

const app = express();

mongoose.connect("mongodb+srv://goerk:QqjQ1MW6ZekNjsNR@cluster0.n0kfb.mongodb.net/myBank?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Connection lost!!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
