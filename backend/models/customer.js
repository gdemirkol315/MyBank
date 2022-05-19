const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  type: { type: String, required: true}
});

module.exports = mongoose.model('Customer', customerSchema);
