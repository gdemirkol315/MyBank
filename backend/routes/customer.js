const express = require('express');
const JsonReader = require("../common/utils/json-reader");
const Customer = require("../models/customer");
const router = express.Router();

router.get("/type", (req, res) => {

  res.status(200).json({
    message: "Periodicity fetched successfully!",
    dataSet: JsonReader.getJsonContent('customertype.json')
  });

});

router.post("", (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    lastname: req.body.lastname,
    type: req.body.type
  });
  customer.save().then(createdCustomer => {
    res.status(201).json({
      message: 'Customer added successfully',
      customerId: createdCustomer._id
    });
  });
});


module.exports = router;
