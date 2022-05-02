const express = require('express');
const JsonReader = require("../common/utils/json-reader");
const mainNewLoan = require("./newloan_main");
const router = express.Router();

router.get("/periods", (req, res) => {

    res.status(200).json({
      message: "Periodicity fetched successfully!",
      dataSet: JsonReader.getJsonContent('periods.json')
    });

});
router.get("/currencies", (req, res) => {
  res.status(200).json({
    message: "Currencies fetched successfully!",
    dataSet: JsonReader.getJsonContent('currency.json')
  });
});

router.post("/generate", (req, res) => {
  console.log(req.body);
  let newLoan = req.body;
  let paymentSchedule = mainNewLoan.generateNewLoan(newLoan.amount,
      newLoan.interestRate,
      newLoan.periodicity,
      newLoan.firstPaymentDate,
      newLoan.utilizationDate,
      newLoan.maturityDate
  );
  res.status(200).json({
    message: "Generation request successfull!",
    dataset: paymentSchedule
  });
});

module.exports = router;
