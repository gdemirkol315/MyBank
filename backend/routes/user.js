const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const router = express.Router();
const tokenKey = 'V&VvmFDnHyX}H5,=GD=ED{ODCB0h~[&jy,>ImL8UyQW{g(-M/kiOPHqPH;bM>Ub';

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(result =>
        res.status(201).json({
          message: 'User created!',
          result: result
        }))
      .catch(err => {
        failedAuth(res, 'This username is already taken!');
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email}).then(user => {

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return failedAuth(res, err);
      if (!result) return failedAuth(res, 'Invalid password!');

      const token = jwt.sign(
        {email: user.email, userId: user._id},
        tokenKey,
        {expiresIn: "1h"});
      res.status(200).json({
        token: token
      });
    });
  }).catch(err => {
    failedAuth(res, "User does not exists!");
  })
});

function failedAuth(res, message) {
  res.status(401).json({
    message: message
  });
}

module.exports = router;
