import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'customer',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerId: string;
  isLoading = true;
  customerDetail;
  customerLoans;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService
      .getCustomerObservable()
      .subscribe(customerTable => {
        this.customerDetail = customerTable;
        if (this.customerLoans != undefined)
          this.isLoading = false;
      });
    this.customerService
      .getCustomerLoansObservable()
      .subscribe(loansTable => {
        this.customerLoans = loansTable;
        if (this.customerDetail != undefined)
          this.isLoading = false;
      });
    this.route.paramMap
      .subscribe(params => {
          this.customerService.getCustomer(Number(params.get('customerId')));
          this.customerService.getCustomerLoans(Number(params.get('customerId')));
        }
      );
  }

}
