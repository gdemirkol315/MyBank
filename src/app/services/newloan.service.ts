import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Loan} from "../models/loan.model";

@Injectable({providedIn: "root"})
export class NewloanService extends DataService {


  generate(newLoan: Loan){
    this.subscribeToPost('newloan/generate', newLoan);
  }

  getObservableNewLoan(){
    return super.getObservablePost();
  }

}
