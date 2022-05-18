const express = require('express');
const JsonReader = require("../common/utils/json-reader");
const mainNewLoan = require("./newloan_main");
const router = express.Router();

router.get("", (req, res) => {
  console.log(JsonReader.getJsonContent('newloan.json'));
  res.status(200).json({
    message: "Newloan form data fetched successfully!",
    dataSet: JsonReader.getJsonContent('newloan.json')
  });
});

router.post("/generate", (req, res) => {
  let newLoan = req.body;
  res.status(200).json({
    message: "Currencies fetched successfully!",
    dataSet: mainNewLoan.generateNewLoan(newLoan.amount,
      newLoan.interestRate,
      newLoan.periodicity,
      newLoan.firstPaymentDate,
      newLoan.utilizationDate,
      newLoan.maturityDate
    )
  });
});

module.exports = router;
