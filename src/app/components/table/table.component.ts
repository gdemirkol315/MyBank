import {Component, Input} from '@angular/core';
import {Subscription} from "rxjs";
import {DropdownService} from "../../services/dropdown.service";


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html'
})
export class TableComponent  {

  @Input() content: string;


  constructor(private dropdownService: DropdownService) {

  }



}
