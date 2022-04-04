const mongoose = require('mongoose');
const fs = require('fs')

const Period = require("../models/periodicity");
const {catchError} = require("rxjs");

mongoose.connect("mongodb+srv://goerk:QqjQ1MW6ZekNjsNR@cluster0.n0kfb.mongodb.net/myBank?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to db');
    console.log('Setup is starting')
    setup();
  })
  .catch(() => {
    console.log('Connection lost!!')
    console.log('Check if ur IP address in IPWhiteList!!')
  });

function setup() {

  savePeriods();
  catchError(err => {
    console.log(err);
  });

  console.log('Setup success!');
}

function savePeriods(){
  let periods = readFile('../models/vals/periodicity.json');
  mongoose.connection.db.dropCollection('periods', function (err, result) {
  });
  for (let i in periods) {
    let periodicity = new Period({period: periods[i].period, periodEnum: periods[i].periodEnum});
    periodicity.save();
  }
  console.log('Periods saved!');
}

function readFile(path) {
  var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
  return obj;
}

