import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Loan} from "../../models/loan.model";
import {NewloanService} from "../../services/newloan.service";
import {CustomerService} from "../../services/customer.service";
import {AlertService} from "../../services/alert.service";
import {ExcelExportService} from "../../services/excel-export.service"

@Component({
  selector: "new-loan",
  templateUrl: "./new-loan.component.html"
})
export class NewLoanComponent {

  newLoan = new Loan();
  isLoading = false;
  generatedPaymentTable;
  generated = false;
  foundCustomerNames: string [];


  constructor(public route: ActivatedRoute,
              private newLoanService: NewloanService,
              private customerService: CustomerService,
              private alertService: AlertService,
              private router: Router) {
    this.newLoan.customerId = "";
  }


  onGenerate(form: NgForm) {
    this.newLoan.amount = form.value.amount;
    this.newLoan.interestRate = form.value.interestRate;
    if (this.isEntriesDone()) {
      this.newLoanService.generate(this.newLoan)
        .subscribe(paymentSchedule => {
          this.generatedPaymentTable = paymentSchedule['dataSet'];
          this.generated = (this.generatedPaymentTable.length > 0);
          if (!this.generated) {
            this.alertService.error('Unknown Error! Table not generated!');
          }
        });
    } else {
      this.alertService.error('Please enter all the necessary fields!');
    }
  }

  isEntriesDone() {
    if (this.newLoan.amount == undefined
      || this.newLoan.customerId == ""
      || this.newLoan.ccy == undefined
      || this.newLoan.interestRate == undefined
      || this.newLoan.firstPaymentDate == undefined
      || this.newLoan.maturityDate == undefined
      || this.newLoan.periodicity == undefined
      || this.newLoan.utilizationDate == undefined)
      return false
    else
      return true
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
    this.newLoan.customerId = customerId;
  }

  exportExcel() {
    ExcelExportService.exportExcel('RepaymentSchedule', this.generatedPaymentTable)
  }

  saveLoan() {
    this.newLoanService.saveLoan(this.newLoan)
      .subscribe((response) => {
        if (response['isSaved'] == true) {
          this.reloadPage("/newloan");
          this.alertService.success('Loan Saved successfully!', {keepAfterRouteChange: true});
        }
      });
  }

  reloadPage(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
