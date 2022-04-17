import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Period} from "../models/period.model";

@Injectable({providedIn: "root"})
export class NewLoanService implements OnInit {

  private periods = new Subject<Period[]>();

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.getPeriodicity();
  }

  getPeriodicity() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/newloan/periods'
      )
      .subscribe(result => {

        this.periods.next(result.posts.map(period => {
          return {
            periodEnum: period.periodEnum,
            period: period.period
          }
        }));
      });
  }

  getPeriodUpdateListener() {
    return this.periods.asObservable();
  }
}
