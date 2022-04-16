import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Currency} from "./currency.model";
import {CurrencyService} from "./currency.service";

@Component({
  selector: 'currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.css']
})
export class CurrencyDropdownComponent implements OnInit {
  currencies;
  ccySelected;
  private currenciesSub: Subscription;
  isLoading = true;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currenciesSub = this.currencyService.getCurrencyUpdateListener()
      .subscribe((currencies: Currency[]) => {
        this.currencies = currencies;
        this.isLoading = false;
      });
    this.currencyService.getCurrencies();
  }

  setSelection(selection) {
    this.ccySelected=selection.value.code;
  }
}
