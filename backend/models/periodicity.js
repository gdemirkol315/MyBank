const mongoose = require('mongoose');

const periodicitySchema = mongoose.Schema({
  period: {type: String, required: true, unique: true},
  periodEnum: {type: String, required: true, unique: true},
  order: {type: Number}
});

module.exports = mongoose.model('periods', periodicitySchema);
