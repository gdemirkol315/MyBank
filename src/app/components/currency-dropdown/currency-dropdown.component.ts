import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../models/currency.model";

@Component({
  selector: 'currency-dropdown',
  templateUrl: './currency-dropdown.component.html'
})
export class CurrencyDropdownComponent implements OnInit {
  currencies;
  @Output() ccyChange = new EventEmitter<string>();
  private currenciesSub: Subscription;
  isLoading = true;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currenciesSub = this.currencyService.getObservableCurrencies()
      .subscribe((currencies: Currency[]) => {
        this.currencies = CurrencyService.mapCurrencies(currencies);
        this.isLoading = false;
      });
    this.currencyService.getCurrencies();
  }

  setSelection(selection) {
    this.ccyChange.emit(selection.value.code);
  }
}
