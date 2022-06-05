import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Customer} from "../models/customer.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class CustomerService extends DataService {

  private customer = new Subject();

  getCustomer(customerId: number) {
    return this.getData('customer/' + customerId)
      .subscribe(customerObject => {
        this.customer.next(customerObject);
    });
  }

  getCustomerObservable(){
    return this.customer.asObservable();
  }

  postCustomer(customer: Customer) {
    return this.postData('customer', customer);
  }

  searchCustomer(searchText: String) {
    return this.postData('customer/search', searchText);
  }

}
