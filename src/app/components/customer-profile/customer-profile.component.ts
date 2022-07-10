import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import header from '../../vals/customerdetail.json';
import headerLoans from '../../vals/customerloans.json';

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
  customerdetailHeader;
  customerLoansHeader;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
    this.customerdetailHeader = header;
    this.customerLoansHeader = headerLoans;
  }

  ngOnInit() {
    this.customerService
      .getCustomerObservable()
      .subscribe(customerTable => {
        this.customerDetail = customerTable;
        this.isLoading = false;
      });
    this.customerService
      .getCustomerLoansObservable()
      .subscribe(loansTable => {
        this.customerLoans = loansTable;
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
