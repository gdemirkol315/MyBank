import {Injectable, OnInit} from "@angular/core";
import {Period} from "../models/period.model";
import {DataService} from "./data.service";

@Injectable({providedIn: "root"})
export class PeriodService extends DataService implements OnInit {


  ngOnInit(): void {
    this.getPeriods();
  }

  getPeriods() {
    this.subscribeTo('newloan/periods');
  }

  getPeriodUpdateListener() {
    return this.dataSubject.asObservable();
  }

  static mapPeriods(periods: Period[]) {
    return periods.map(period => {
      return {
        periodEnum: period.periodEnum,
        period: period.period
      }
    });
  }
}
