import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter} from 'rxjs/operators';
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'customer',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerId: string;
  isLoading = true;
  tableContent;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService
      .getCustomerObservable()
      .subscribe(customerTable => {
        this.tableContent = customerTable;
        this.isLoading = false;
      })
    this.route.paramMap
      .subscribe(params => {
          this.customerService.getCustomer(Number(params.get('customerId')));
        }
      );
  }

}
