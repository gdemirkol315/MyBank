import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit{

  @Input() dataSource;
  displayedColumns: string[];

  ngOnInit(): void {
    if (this.dataSource.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource[0]);
    }
  }


}
