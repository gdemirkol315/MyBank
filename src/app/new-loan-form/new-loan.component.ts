import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

import {NewLoanService} from "./new-loan.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {NewLoan} from "./new-loan.model";

@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html",
  styleUrls: ["./new-loan.component.css"]
})
export class NewLoanComponent implements OnInit {

  public newLoan: NewLoan;
  periodicityVals: string[] = ['Monthly', 'Quarterly','Semi-anually','Anually']

  isLoading = true;

  constructor(public newLoanService: NewLoanService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onSavePost(form: NgForm) {

  }
}
