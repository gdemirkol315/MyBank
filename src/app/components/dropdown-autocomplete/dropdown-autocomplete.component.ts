import {Component, Input, OnInit} from '@angular/core';
import {DropdownComponent} from "../dropdown/dropdown.component";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";


@Component({
  selector: 'dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html'
})
export class DropdownAutocompleteComponent extends DropdownComponent implements OnInit{
  @Input() optionLimit = 50;
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;


  override ngOnInit() {
    super.ngOnInit();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (!this.optionURL){
      //return this.dropdownService.getOptions(this.optionURL)
    }
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
