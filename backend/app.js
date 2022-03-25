const express = require('express');
const Post = require('./models/post');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.use('/api/posts', (req, res, next) => {
  const posts = [{id: 'dsadas', title: 'bu bir title', text: 'patates'}];

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Posts added successfully!',
  });
});


module.exports = app;
