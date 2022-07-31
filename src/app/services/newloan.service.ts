import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Loan} from "../models/loan.model";

@Injectable({providedIn: "root"})
export class NewloanService extends DataService {


  generate(newLoan: Loan){
    return this.postData('newloan/generate', newLoan);
  }

  saveLoan(newLoan: Loan){
    return this.postData('newloan/saveLoan', newLoan)
  }

  getLoan(loanId: string) {
    return this.postData('newloan/getLoan', {loanId: loanId})
  }
}
