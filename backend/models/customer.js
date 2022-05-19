const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name: {type: String, required: true},
  lastname: {type: String},
  type: {type: String, required: true},
  address: {type: String, required: true},
  rating: {type: Number},
  entitytype: {type: String}
});

module.exports = mongoose.model('Customer', customerSchema);
