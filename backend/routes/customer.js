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

router.post("/search", (req, res) => {
  let searchTxt = req.body.searchText;
  console.log(searchTxt);
  Customer.find({
    "name": new RegExp(searchTxt, 'i')
  }).then(result => {
    result.unshift(JsonReader.getJsonContent('foundcustomer_headers.json'));
    res.status(200).json({
      message: "Search successful!",
      foundCustomers: result
    });
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
