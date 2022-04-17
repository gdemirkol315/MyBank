import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

import {PeriodService} from "../common/services/period.service";
import {ActivatedRoute} from "@angular/router";
import {NewLoan} from "../common/models/new-loan.model";
import {Subscription} from "rxjs";
import {Period} from "../common/models/period.model";

@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html",
  styleUrls: ["./new-loan.component.css"]
})
export class NewLoanComponent implements OnInit {

  public newLoan: NewLoan;
  periodVals;
  private periodsSub: Subscription;
  isLoading = true;

  constructor(public periodService: PeriodService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.periodsSub = this.periodService.getPeriodUpdateListener()
      .subscribe((periods: Period[]) => {
        this.periodVals=PeriodService.mapPeriods(periods);
        this.isLoading = false;
      });
    this.periodService.getPeriods();

    if (this.periodVals != null) {
      this.isLoading = false;
    }

  }

  onSavePost(form: NgForm) {

  }

  ccyprint(ccy) {
    console.log(ccy);
  }
}
