const express = require('express');
const JsonReader = require("../common/utils/json-reader");
const mainNewLoan = require("./newloan_main");
const router = express.Router();

router.get("/periods", (req, res) => {
    console.log(JsonReader.getJsonContent('periods.json'));
    res.status(200).json({
      message: "Periodicity fetched successfully!",
      dataSet: JsonReader.getJsonContent('periods.json')
    });

});
router.get("/currencies", (req, res) => {
  console.log(JsonReader.getJsonContent('currency.json'));
  res.status(200).json({
    message: "Currencies fetched successfully!",
    dataSet: JsonReader.getJsonContent('currency.json')
  });
});
//test
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
