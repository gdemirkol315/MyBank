import { Component, OnInit } from '@angular/core';
import {Period} from "../common/models/period.model";
import {Subscription} from "rxjs";
import {PeriodService} from "../common/services/period.service";

@Component({
  selector: 'period-dropdown',
  templateUrl: './period-dropdown.component.html',

})
export class PeriodDropdownComponent implements OnInit {

  periodVals: Period[];
  private periodsSub: Subscription;
  isLoading = true;
  private selection: string;

  constructor(private periodService: PeriodService) { }

  ngOnInit(): void {
    this.periodsSub = this.periodService.getPeriodUpdateListener()
      .subscribe((periods: Period[]) => {
        this.periodVals = PeriodService.mapPeriods(periods);
        this.isLoading = false;
      });
    this.periodService.getPeriods();

    if (this.periodVals != null) {
      this.isLoading = false;
    }
  }

  setSelection(selection) {
    this.selection = selection.value.periodEnum;
  }
}
