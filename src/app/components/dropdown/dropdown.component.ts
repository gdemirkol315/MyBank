import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {DropdownService} from "../../services/dropdown.service";


@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {
  @Output() options;
  @Output() optionChange = new EventEmitter<string>();
  @Input() setOptions;
  @Input() optionURL: string;
  @Input() valName: string;
  @Input() optionHeader: string;
  private optionSub: Subscription;
  isLoading = true;

  constructor(protected dropdownService: DropdownService) {

  }

  ngOnInit(): void {
    if (!this.setOptions) {
      this.dropdownService.getOptions(this.optionURL)
        .subscribe((options) => {
          this.options =  options['dataSet'][this.valName];
          this.isLoading = false;
        });
      ;
    } else if (this.setOptions) {
      this.options = this.setOptions;
    }
  }

  setSelection(selection) {
    this.optionChange.emit(selection.value.code);
  }
}
