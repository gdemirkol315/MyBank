const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
  loanId: {type: String},
  customerId: {type: String},
  amount: {type: Number},
  interestRate: {type: Number},
  utilizationDate: {type: Date},
  firstPaymentDate: {type: Date},
  maturityDate: {type: Date},
  ccy: {type: String},
  periodicity: {type: String}
});

module.exports = mongoose.model('Loan', loanSchema);
