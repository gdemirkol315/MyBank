const express = require('express');
const JsonReader = require("../common/utils/json-reader")

const router = express.Router();

router.get("/periods", (req, res) => {

    res.status(200).json({
      message: "Periodicity fetched successfully!",
      posts: JsonReader.getJsonContent('periods.json')
    });

});
router.get("/currencies", (req, res) => {
  res.status(200).json({
    message: "Currencies fetched successfully!",
    currencies: JsonReader.getJsonContent('currency.json')
  });
});

module.exports = router;
