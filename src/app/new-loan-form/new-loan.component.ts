import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NewLoan} from "../common/models/new-loan.model";

@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html"
})
export class NewLoanComponent implements OnInit {

  public newLoan: NewLoan;
  isLoading = false;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit(): void {


  }

  onSavePost(form: NgForm) {

  }

  ccyprint(ccy) {
    console.log(ccy);
  }
}
