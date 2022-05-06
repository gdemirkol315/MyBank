import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Currency} from "../models/currency.model";
import {Customer} from "../models/customer.model";

@Injectable({providedIn: "root"})
export class CustomerService extends DataService {


  getCustomerTypes() {
    this.subscribeToGet('customer/type');
  }

  getObservableCustomerTypes(){
    return super.getObservableGet();
  }

  postCustomer(customer: Customer){
    this.postData('customer',customer);
  }

}
