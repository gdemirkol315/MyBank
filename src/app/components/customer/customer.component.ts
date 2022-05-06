import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer.model";

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
  name:string;
  lastName:string;
  customerType: string;

  constructor(private customerService: CustomerService) {
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

  addCustomer(customerAdd: NgForm) {
    let customer = new Customer(customerAdd.value.name,customerAdd.value.lastName,this.customerType);
    this.customerService.postCustomer(customer);
  }

  customerTypeSet(event) {
    this.customerType = event;
  }
}
