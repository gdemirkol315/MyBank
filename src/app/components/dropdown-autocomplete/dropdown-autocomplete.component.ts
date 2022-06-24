import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {first, Observable} from "rxjs";
import {CustomerService} from "../../services/customer.service";


@Component({
  selector: 'dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html'
})
export class DropdownAutocompleteComponent {

  options: string[];
  @Input() header;
  textChange= new Observable<string>();
  myControl = new FormControl('');
  searchText: string;


  constructor(private customerService: CustomerService) {
  }



  searchCustomer(value: string) {

    this.customerService.searchCustomer(value).subscribe(result => {
      this.options = result["foundCustomers"].map(item => {
        return item.name
      });
    });

  }

  searchTextChange(newValue: any) {
    this.customerService.searchCustomer(newValue.target.value).pipe(first())
      .subscribe(result => {
        this.options = result["foundCustomers"].map(item => {
          return item.name
        });
      });
  }
}
