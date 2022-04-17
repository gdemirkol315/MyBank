import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Loan} from "../../models/new-loan.model";


@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html"
})
export class NewLoanComponent implements OnInit {

  newLoan = new Loan();
  isLoading = false;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit(): void {


  }

  onSavePost(form: NgForm) {

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
}
