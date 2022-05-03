import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Currency} from "../models/currency.model";

@Injectable({providedIn: "root"})
export class CustomerService extends DataService {


  getCustomerTypes() {
    this.subscribeToGet('customer/type');
  }

  getObservableCustomerTypes(){
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
