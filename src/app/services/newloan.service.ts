import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Loan} from "../models/loan.model";

@Injectable({providedIn: "root"})
export class NewloanService extends DataService {

  generate(newLoan: Loan){
    this.postData('newloan/generate', newLoan).subscribe(generatedPaymentSchedule => {
      console.log(generatedPaymentSchedule);
    });
  }

}
