const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://goerk:QqjQ1MW6ZekNjsNR@cluster0.n0kfb.mongodb.net/myBank?retryWrites=true&w=majority")
  .then(()=>{
    console.log('Connected to db');
  })
  .catch(()=>{
    console.log('Connection lost!!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
// QuBqs0T45GDKPlIG
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
      console.log(documents);
  });
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: ""
  });
});

module.exports = app;
