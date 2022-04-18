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
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      failedAuth(res);
    }
    return {userExists: bcrypt.compare(req.body.password, user.password), user: user};
  }).then(result => {
    if (!result.userExists) {
      failedAuth(res);
    }
    const token = jwt.sign(
      {email: result.user.email, userId: result.user._id},
      tokenKey,
      {expiresIn: "1h"}
    );
    res.status(200).json({
      token: token
    });
  })
    .catch((err) => {
      console.log(err);
      failedAuth(res);
    })
});

function failedAuth(res) {
  res.status(401).json({
    message: "Auth failed!"
  });
}

module.exports = router;
