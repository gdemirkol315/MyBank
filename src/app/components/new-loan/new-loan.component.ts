import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Loan} from "../../models/loan.model";
import {NewloanService} from "../../services/newloan.service";
import {CustomerService} from "../../services/customer.service";
import header from '../../vals/newloan.json';
import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import {AlertService} from "../../services/alert.service";

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
  newLoanHeaders;


  constructor(public route: ActivatedRoute,
              private newLoanService: NewloanService,
              private customerService: CustomerService,
              private alertService: AlertService,
              private router: Router) {
    this.newLoanHeaders = header;
    this.newLoan.customerId ="";
  }


  onGenerate(form: NgForm) {
    this.newLoan.amount = form.value.amount;
    this.newLoan.interestRate = form.value.interestRate;
    this.newLoanService.generate(this.newLoan)
      .subscribe(paymentSchedule => {
        this.generatedPaymentTable = paymentSchedule['dataSet'];
        this.generated = (this.generatedPaymentTable.length > 0);
      });
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
    this.newLoan.customerId =customerId;
  }

  exportExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('RepaymentSchedule');
    let columnKeys = Object.keys(this.newLoanHeaders);
    worksheet.columns = columnKeys.map(column => {
      return {
        header: column,
        key: column,
        width: 30
      }
    });

    this.generatedPaymentTable.forEach(payment => {
      let paymentObj = new Object();
      columnKeys.forEach(column => {
        paymentObj[column] = payment[column]
      })
      worksheet.addRow(paymentObj);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, 'RepaymentSchedule.xlsx');
    })

  }

  saveLoan() {
    this.newLoanService.saveLoan(this.newLoan)
      .subscribe((response) => {
        if (response['isSaved'] == true) {
          this.reloadPage("/newloan");
          this.alertService.success('Loan Saved successfully!',{ keepAfterRouteChange: true });
        }
      });
  }

  reloadPage(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
}
