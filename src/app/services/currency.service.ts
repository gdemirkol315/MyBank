import {Injectable, OnInit} from "@angular/core";
import {DataService} from "./data.service";
import {Currency} from "../models/currency.model";

@Injectable({providedIn: "root"})
export class CurrencyService extends DataService implements OnInit {

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {
    this.subscribeToGet('newloan/currencies');
  }

  getObservableCurrencies(){
    return super.getObservableGet();
  }

  static mapCurrencies(currencies: Currency[]) {
    return currencies.map(currency => {
      return {
        code: currency.code,
        text: currency.text
      }
    });
  }

}
