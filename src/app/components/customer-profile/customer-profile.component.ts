import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import header from '../../vals/customerdetail.json';

@Component({
  selector: 'customer',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerId: string;
  isLoading = true;
  tableContent;
  customerdetailHeader;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
    this.customerdetailHeader = header;
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
