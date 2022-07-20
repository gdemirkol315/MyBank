const express = require('express');
const JsonReader = require("../common/utils/json-reader");
const mainNewLoan = require("./newloan_main");
const Loan = require("../models/loan");
const router = express.Router();

router.get("", (req, res) => {
  res.status(200).json({
    message: "Newloan form data fetched successfully!",
    dataSet: JsonReader.getJsonContent('newloan.json')
  });
});

router.post("/generate", (req, res) => {
  let newLoan = req.body;
  res.status(200).json({
    message: "Repayment plan generated successfully!",
    dataSet: mainNewLoan.generateNewLoan(newLoan.amount,
      newLoan.interestRate,
      newLoan.periodicity,
      newLoan.firstPaymentDate,
      newLoan.utilizationDate,
      newLoan.maturityDate
    )
  });
});

router.post("/saveLoan", (req, res) => {
  const loan = new Loan({
    customerId: req.body.customerId,
    amount:req.body.amount,
    interestRate: req.body.interestRate,
    utilizationDate: req.body.utilizationDate,
    firstPaymentDate: req.body.firstPaymentDate,
    maturityDate: req.body.maturityDate,
    ccy: req.body.ccy,
    periodicity: req.body.periodicity
  });
  loan.save().then(result => {
    res.status(201).json({
      isSaved: true
    });
  });
});

router.get("/:customerId", (req, res, next) => {
  Loan.find({customerId: req.params.customerId})
    .then(loans => {
      if (loans) {
        let loansTable =  loans;
        res.status(200).json(loansTable);
      }
    })
});

module.exports = router;
