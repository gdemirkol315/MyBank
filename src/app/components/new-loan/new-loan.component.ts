import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Loan} from "../../models/loan.model";
import {NewloanService} from "../../services/newloan.service";
import {CustomerService} from "../../services/customer.service";
import header from '../../vals/newloan.json';

@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html"
})
export class NewLoanComponent {

  newLoan = new Loan();
  customerId:string ="";
  isLoading = false;
  generatedPaymentTable;
  generated = false;
  foundCustomerNames: string [];
  newLoanHeaders;


  constructor(public route: ActivatedRoute,
              private newLoanService: NewloanService,
              private customerService: CustomerService) {
    this.newLoanHeaders = header;
  }


  onGenerate(form: NgForm) {
    this.newLoan.amount = form.value.amount;
    this.newLoan.interestRate = form.value.interestRate;
    this.newLoanService.generate(this.newLoan)
      .subscribe(paymentSchedule => {
        this.generatedPaymentTable = paymentSchedule['dataSet'];
        console.log(this.generatedPaymentTable)
        this.generated = (this.generatedPaymentTable.length > 0);
      });
    ;
  }

  addDate(dateType: string, date) {
    if (dateType == 'utilizationDate') {
      this.newLoan.utilizationDate = new Date(date);
    } else if (dateType == 'firstPaymentDate') {
      this.newLoan.firstPaymentDate = new Date(date);
    } else if (dateType == 'maturityDate') {
      this.newLoan.maturityDate = new Date(date);
    }
  }

  ccySet(event) {
    this.newLoan.ccy = event;
  }

  periodSet(event) {
    this.newLoan.periodicity = event;
  }

  searchCustomer(nameSearch) {
    this.customerService.searchCustomer(nameSearch)
      .subscribe((result) => {
        let foundCustomers = result['foundCustomers'];
        this.foundCustomerNames = foundCustomers.map(customer => customer['name']);
      });
  }

  setCustomerId(customerId: any) {
    this.customerId = customerId;
  }
}
