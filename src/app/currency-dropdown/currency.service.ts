import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {Currency} from "./currency.model";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class CurrencyService implements OnInit {

  private currencies = new Subject<Currency[]>();

  ngOnInit(): void {
    this.getCurrencies();
  }

  constructor(private http: HttpClient) {
  }

  getCurrencies() {
    this.http
      .get<{ message: string; currencies: any }>(
        'http://localhost:3000/api/newloan/currencies'
      )
      .subscribe(result => {
        this.currencies.next(result.currencies.map(currency => {
          return {
            code: currency.code,
            text: currency.text
          }
        }));
      });
  }


  getCurrencyUpdateListener() {
    return this.currencies.asObservable();
  }

}
