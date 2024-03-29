import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NewloanService} from "../../services/newloan.service";
import {ExcelExportService} from "../../services/excel-export.service";

@Component({
  selector: "get-loan",
  templateUrl: "./get-loan.component.html"
})
export class GetLoanComponent implements OnInit {

  private customerId;

  constructor(
    private route: ActivatedRoute,
    private newLoanService: NewloanService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.customerId = params.get('customerId');
        this.getLoan(params.get('loanId'));
      });

  }

  getLoan(loanId) {
    this.newLoanService.getLoan(loanId)
      .subscribe(loan => {
        this.generateExcel(loan[0]);
      })
  }

  generateExcel(loan) {
    this.newLoanService.generate(loan)
      .subscribe(result => {
        ExcelExportService.exportExcel('RepaymentSchedule', result['dataSet']);
        this.router.navigate(['/customer/',this.customerId])
      });
  }
}
