import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Subscription} from "rxjs";
import {Period} from "../../models/period.model";
import {PeriodService} from "../../services/period.service";

@Component({
  selector: 'period-dropdown',
  templateUrl: './period-dropdown.component.html',

})
export class PeriodDropdownComponent implements OnInit {

  periodVals: Period[];
  private periodsSub: Subscription;
  @Output() periodChange = new EventEmitter<string>();
  isLoading = true;

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
    this.periodChange.emit(selection.value.periodEnum);
  }
}
