const express = require('express');


const app = express();

app.use((req,res,next)=>{
  console.log('first middleware');
  next(); //always call next if you are not sending a response
});

app.use((req,res,next)=>{

  res.send('Hello from express!')
});

module.exports = app;
