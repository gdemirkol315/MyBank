import {Injectable, OnInit} from "@angular/core";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Periodicity} from "../common/enums/periodicity.enum";

@Injectable({providedIn: "root"})
export class NewLoanService implements OnInit{

  constructor(private http: HttpClient) {
  }
  

  ngOnInit(): void {
    this.getPeriodicity();
  }

  getPeriodicity() {
    this.http
      .get<{ message: string; periodicities: any }>(
        'http://localhost:3000/api/newloan/periods'
      )
      .subscribe(periodicities => {
        return periodicities;
      });
  }


}
