const express = require('express');
const JsonReader = require("../common/utils/json-reader");
const router = express.Router();

router.get("/type", (req, res) => {

  res.status(200).json({
    message: "Periodicity fetched successfully!",
    dataSet: JsonReader.getJsonContent('customertype.json')
  });

});


module.exports = router;
