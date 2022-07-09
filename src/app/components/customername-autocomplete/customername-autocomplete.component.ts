import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {first, Observable} from "rxjs";
import {CustomerService} from "../../services/customer.service";


@Component({
  selector: 'customername-autocomplete',
  templateUrl: './customername-autocomplete.component.html'
})
export class CustomernameAutocompleteComponent {

  options: string[];
  @Input() header;
  @Output() selectionChange = new EventEmitter<string>();
  textChange= new Observable<string>();
  myControl = new FormControl('');
  searchText: string;


  constructor(private customerService: CustomerService) {
  }

  searchTextChange(newValue: any) {
    this.customerService.searchCustomer(newValue.target.value).pipe(first())
      .subscribe(result => {
        this.options = result["foundCustomers"].map(item => {
          return item.name
        });
      });
  }

  getCustomerId(customerName: any) {
    this.customerService.searchCustomer(customerName).subscribe(result => {
      this.selectionChange.emit(result["foundCustomers"].map(item => {
        return item.customerId
      })[0]);
    });
  }
}
