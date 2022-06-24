import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer.model";
import {AlertService} from "../../services/alert.service";
import {first} from "rxjs";

@Component({
  selector: 'customer',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  findCustomerMode: boolean = false;
  addCustomerMode: boolean = false;
  searchText: string = "";
  isLoading: boolean = false;
  name: string;
  lastName: string;
  customerType: string;
  address: string;
  rating: number;
  private entityType: string;
  foundCustomers: any[] = new Array();

  constructor(private customerService: CustomerService, private alertService: AlertService) {
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

  search(customerSearch: NgForm) {
    let searchText = customerSearch.value.searchText

    this.customerService.searchCustomer(searchText).pipe(first()).subscribe(result => {
      this.foundCustomers = result['foundCustomers'];
      this.foundCustomers.unshift({
        "customerId": "Customer Id##text",
        "type": "Type##text",
        "name": "Name##text",
        "lastname": "Last Name##text",
        "entitytype": "Entity Type##text",
        "rating" : "Rating##text",
        "address": "Address##text"
      });
    });

  }

  addCustomer(customerAdd: NgForm) {
    let customer = new Customer('',
      customerAdd.value.name,
      customerAdd.value.lastName,
      this.customerType,
      customerAdd.value.address,
      this.entityType,
      customerAdd.value.rating);
    this.customerService.postCustomer(customer)
      .subscribe(
        response => {
          if (response['message'] === 'Customer created successfully') {
            this.alertService.success('Customer ' + response['customerName'] + ' created successfully!', {autoClose: true});
            customerAdd.resetForm();
          }
        }
      );
  }

  customerTypeSet(event) {
    this.customerType = event;
  }

  entityTypeSet(event) {
    this.entityType = event;
  }
}
