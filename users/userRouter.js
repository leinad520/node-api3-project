const express = require('express');
const server = require('../server.js');
const router = express.Router();

// Database methods
const User = require('./userDb.js');
const Post = require('../posts/postDb.js');

// Built-in middleware
router.use(express.json());

// custom middleware
router.use(logger);

// API /user

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(user => {
    res.status(201).send({user})
  })
  .catch(err => res.status(500).send(err))
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const {id} = req.params;
  req.body.user_id = id;
  Post.insert(req.body)
  .then(post => {
    res.status(201).send(post);
  })

});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(user => {
    res.status(200).send(user)
  })
  .catch(err => res.status(500).send(err))
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).send(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).send(posts)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware
function validateUserId(req, res, next) {
  const {id} = req.params;
  User.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({message: "invalid user id"});
    }
  })
  .catch(e => res.status(500).send(e))
}

function validateUser(req, res, next) {
    if (!req.body) {
      res.status(400).send({message: "missing user data"});
    } else if (!req.body.name) {
      res.status(400).send({message: "missing required name field"})
    }
    next();
}

function logger(req, res, next) {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = `${month}/${day}/${year}`

  console.log(req.method, req.url, date);
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).send({message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).send({message: "missing required text field"})
  }
  next();
}

module.exports = router;
