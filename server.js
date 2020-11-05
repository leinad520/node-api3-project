// Server
const express = require('express');
const server = express();

// Router
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
server.use('/user', userRouter);
server.use('/post', postRouter);

//Custom middleware
server.use(logger);

function logger(req, res, next) {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = `${month}/${day}/${year}`

  console.log(req.method, req.url, date);
  next();
}

// API
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
