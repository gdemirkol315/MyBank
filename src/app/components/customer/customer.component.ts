import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer.model";
import {AlertService} from "../../services/alert.service";

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
  name: string;
  lastName: string;
  customerType: string;
  address: string;
  rating: number;
  private entityType: string;

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

  search(customerNumber) {

  }

  addCustomer(customerAdd: NgForm) {
    let customer = new Customer(customerAdd.value.name,
      customerAdd.value.lastName,
      this.customerType,
      customerAdd.value.address,
      this.entityType,
      customerAdd.value.rating);
    this.customerService.postCustomer(customer)
      .subscribe(
      response => {
        if (response['message'] === 'Customer created successfully') {
          this.alertService.success('Customer Created successfully! Customer ID: ' + response['customerId'], { keepAfterRouteChange: true });
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
