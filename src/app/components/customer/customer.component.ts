import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  findCustomerMode: boolean = false;
  addCustomerMode: boolean = false;
  searchText: string = "";
  isLoading: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  setFindCustomerMode() {
    this.findCustomerMode = true;
    this.addCustomerMode = false;
  }

  setAddCustomerMode() {
    this.findCustomerMode = false;
    this.addCustomerMode = true;
  }

  search(customerNumber) {

  }

  addCustomer() {

  }
}
