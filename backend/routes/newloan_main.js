const JsonReader = require("../common/utils/json-reader");

function generateNewLoan(amount, interestRate, periodicity, firstPaymentDate, utilizationDate, maturityDate) {

  try {
    var paymentStart = new Date(firstPaymentDate);
    var utilization = new Date(utilizationDate);
    var maturity = new Date(maturityDate);

    return calculatePaymentSchedule(amount, interestRate, periodicity, utilization, maturity, paymentStart);

  } catch (e) {
    console.error(e);
  }
}

function calculatePaymentSchedule(loanAmount, interestRate, frequency, utilizationDate, maturityDate, paymentStart) {

  var durationDays = getDifferenceInDays(maturityDate, paymentStart);
  var nInstallments = Math.ceil(durationDays / getPeriodicityDays(frequency));
  var installmentAmount = loanAmount / nInstallments;
  var remainingPrincipal = loanAmount;
  var payments = [];
  var interestAmount = 0.00;
  var previousPaymentDate = new Date(utilizationDate);
  var paymentDate = new Date();

  if (paymentStart.toString() == utilizationDate.toString()) {
    paymentDate = getNextPaymentDate(paymentStart, frequency);
  } else {
    paymentDate = paymentStart;
  }
  payments.push(new Payment("utilization", -loanAmount, 0, interestRate, 0, utilizationDate, utilizationDate))

  for (let i = 0; i < nInstallments; i++) {
    interestAmount = remainingPrincipal * getDifferenceInDays(paymentDate, previousPaymentDate) / 360 * interestRate
    payments.push(new Payment(i, installmentAmount, remainingPrincipal, interestRate, interestAmount, previousPaymentDate, paymentDate));
    remainingPrincipal = remainingPrincipal - installmentAmount;
    previousPaymentDate = paymentDate;
    paymentDate = getNextPaymentDate(paymentDate, frequency);
  }

  return payments;
}

function Payment(id, principalPayment, remainingPrincipal, interestRate, interestAmount, previousPaymentDate, paymentDate) {
  this.id = id;
  this.principalPayment = principalPayment;
  this.remainingPrincipal = remainingPrincipal;
  this.interestRate = interestRate;
  this.interestAmount = interestAmount;
  this.previousPaymentDate = previousPaymentDate;
  this.paymentDate = paymentDate;
}

function getDifferenceInDays(thisDate, minusThisDate) {
  if (thisDate != null && minusThisDate != null) {
    var durationTime = thisDate.getTime() - minusThisDate.getTime();
    return Math.round(durationTime / (1000 * 3600 * 24));
  }
  return 0;
}

function getNextPaymentDate(previousPaymentDate, paymentFrequency) {

  if (paymentFrequency == 'M') {
    return addMonths(previousPaymentDate, 1);
  } else if (paymentFrequency == 'Q') {
    return addMonths(previousPaymentDate, 3);
  } else if (paymentFrequency == 'H') {
    return addMonths(previousPaymentDate, 6);
  } else if (paymentFrequency == 'Y') {
    return addMonths(previousPaymentDate, 12);
  }
  throw 'ERROR: unknown periodicity'
}

function getPeriodicityDays(paymentFrequency) {

  if (paymentFrequency == 'M') {
    return 31;
  } else if (paymentFrequency == 'Q') {
    return 92;
  } else if (paymentFrequency == 'H') {
    return 164;
  } else if (paymentFrequency == 'Y') {
    return 365;
  }
  throw 'ERROR: unknown periodicity'
}

function getEOM(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date, nMonths) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();

  for (var i = 0; i < nMonths; i++) {
    if (month == 12) {
      year++;
      month = 1
    } else {
      month++;
    }
  }
  return getEOM(new Date(year, month, 1));
}

module.exports = {generateNewLoan};
