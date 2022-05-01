import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Loan} from "../../models/loan.model";
import {NewloanService} from "../../services/newloan.service";


@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html"
})
export class NewLoanComponent implements OnInit {

  newLoan = new Loan();
  isLoading = false;

  constructor(public route: ActivatedRoute, private newLoanService: NewloanService) {
  }

  ngOnInit(): void {


  }

  onGenerate(form: NgForm) {
    console.log('front-end:\n' +'amount: ' + form.value.amount,
      'ccy: ' + form.value.ccySelected,
      'interestRate: ' + form.value.interestRate,
      'periodicity: ' + form.value.selectedPeriod,
      'utilizationDate: ' + form.value.utilizationDate,
      'firstPaymentDate: ' + form.value.firstPaymentDate,
      'maturityDate: ' + form.value.maturityDate);
    this.newLoanService.generate(form.value.amount,
      form.value.ccy,
      form.value.interestRate,
      form.value.periodicity,
      form.value.utilizationDate,
      form.value.firstPaymentDate,
      form.value.maturityDate);
  }

  addDate(dateType: string, date) {
    if (dateType == 'utilizationDate') {
      this.newLoan.utilizationDate = new Date(date);
    } else if (dateType == 'firstPaymentDate') {
      this.newLoan.firstPaymentDate = new Date(date);
    } else if (dateType == 'maturityDate') {
      this.newLoan.maturityDate = new Date(date);
    }
  }

  ccyPrint(event) {
    console.log(event)
  }
}
