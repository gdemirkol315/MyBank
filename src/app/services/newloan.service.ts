import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Loan} from "../models/loan.model";

@Injectable({providedIn: "root"})
export class NewloanService extends DataService {

  generate(amount:number,
           ccy:string,
           interestRate:number,
           periodicity:string,
           utilizationDate:Date,
           firstPaymentDate:Date,
           maturityDate: Date){
    const newLoan: Loan = {
      id:"",
      ccy:ccy,
      amount: amount,
      interestRate: interestRate,
      periodicity:periodicity ,
      utilizationDate: utilizationDate,
      firstPaymentDate: firstPaymentDate,
      maturityDate: maturityDate};
    this.postData('newloan/generate', newLoan).subscribe(generatedPaymentSchedule => {
      console.log(generatedPaymentSchedule);
    });
  }

}
