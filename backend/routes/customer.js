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

router.get("/entitytype", (req, res) => {

  res.status(200).json({
    message: "Periodicity fetched successfully!",
    dataSet: JsonReader.getJsonContent('entitytype.json')
  });

});

router.post("", (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    lastname: req.body.lastname,
    type: req.body.type,
    address: req.body.address,
    rating: req.body.rating,
    entitytype: req.body.entitytype
  });
  customer.save().then(createdCustomer => {
    res.status(201).json({
      message: 'Customer created successfully',
      customerName: createdCustomer.name
    });
  });
});


module.exports = router;
