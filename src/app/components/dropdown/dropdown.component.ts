import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Utils} from "../../misc/utils";
import {DropdownService} from "../../services/dropdown.service";


@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {
  options;
  @Output() optionChange = new EventEmitter<string>();
  @Input() optionURL: string;
  @Input() optionHeader: string;
  private optionSub: Subscription;
  isLoading = true;

  constructor(private dropdownService: DropdownService) {

  }

  ngOnInit(): void {
    this.optionSub = this.dropdownService.getObservableOptions()
      .subscribe((options) => {
        this.options = Utils.mapDropdownValues(options);
        this.isLoading = false;
      });
    this.dropdownService.getOptions(this.optionURL);
  }

  setSelection(selection) {
    this.optionChange.emit(selection.value.code);
  }
}
