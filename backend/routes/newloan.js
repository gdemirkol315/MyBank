const express = require('express');
const Periodicity = require("../models/periodicity");

const router = express.Router();

router.get("/periods", (req, res) => {
  Periodicity.find().sort('order').then(documents => {
    res.status(200).json({
      message: "Periodicity fetched successfully!",
      posts: documents
    });
  });
});

module.exports = router;
