import {Injectable, OnInit} from "@angular/core";
import {DataService} from "./data.service";
import {Currency} from "../models/currency.model";

@Injectable({providedIn: "root"})
export class DropdownService extends DataService {


  getOptions(optionsURL: string) {
    this.subscribeToGet(optionsURL);
  }

  getObservableOptions() {
    return super.getObservableGet();
  }


}
