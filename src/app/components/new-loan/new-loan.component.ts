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
  generatedPaymentTable;
  generated = false;

  constructor(public route: ActivatedRoute, private newLoanService: NewloanService) {
  }

  ngOnInit(): void {
    this.newLoanService.getObservableNewLoan().subscribe(paymentSchedule => {
      this.generatedPaymentTable = paymentSchedule;
      console.log( this.generatedPaymentTable)
      this.generated = (this.generatedPaymentTable.length > 0);
    });
  }

  onGenerate(form: NgForm) {
    this.newLoan.amount = form.value.amount;
    this.newLoan.interestRate = form.value.interestRate;
    this.newLoanService.generate(this.newLoan);
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

  ccySet(event) {
    this.newLoan.ccy = event;
  }

  periodSet(event) {
    this.newLoan.periodicity = event;
  }
}
