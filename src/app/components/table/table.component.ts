import {Component, Input, OnInit} from '@angular/core';
import fields from '../../vals/fields.json';
import {Constants} from '../../misc/constants';


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  /**
   * This component supplies generic approach for creating tables in angular.
   * fields.json should be maintained for column descriptions and types.
   *
   * @param  dataSource  is an array of JSON objects that will fill the table.
   *
   */
  @Input() dataSource;
  columnKeys: string[];

  ngOnInit(): void {
    this.columnKeys = Object.keys(this.dataSource[0]).filter(column => {
      if (column.substr(0, 1) === '_') {
        return false;
      }
      return true;
    })
  }

  getColumnName(columnId: string) {
    let header = fields[columnId][Constants.CAPTION]
    return header;
  }

  formatData(data: any, columnId: string) {
    let dataType = fields[columnId][Constants.TYPE]
    switch (dataType) {
      case "text":
        return data;
      case "amount":
        return data.toLocaleString(
          undefined,
          {maximumFractionDigits: 2}
        );
      case "date":
        return (new Date(data)).toLocaleString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "numeric"
        });
      case "double":
        return data.toLocaleString(
          undefined,
          {maximumFractionDigits: 4}
        );
      case "percent":
        return parseFloat(data).toFixed(2) + "%";
    }
  }

  getLink(columnKey: string, element) {
    return element[columnKey] + "/";
  }

  isLink(columnKey: string) {
    if (fields[columnKey][Constants.ROUTE] == undefined)
      return false;
    return true;
  }
}
