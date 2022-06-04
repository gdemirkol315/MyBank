import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  /**
   * This component supplies generic approach for creating tables in angular.
   *
   * @param  dataSource  is an array of JSON objects that will fill the table.
   *                     First item in the array must have the column settings, as example below.
   *                     technical name should be passed as key and setting must be separated by ##
   *                     {key: header name##column data type,...}
   *                     {
   *                        "id": "Id##text",
   *                        "principalPayment": "Principal Payment##amount"
   *                     }
   */
  @Input() dataSource;
  columnSettings: string[]
  columnKeys: string[]

  ngOnInit(): void {
    this.columnSettings = this.dataSource[0];
    this.dataSource.shift();
    if (this.dataSource.length > 0) {
      this.columnKeys = Object.keys(this.dataSource[1]);
    }

  }


  getColumnName(columnId: string) {
    let header = this.columnSettings[columnId].split("##")[0];
    return header;
  }

  formatData(data: any, columnId: string) {
    let dataType = this.columnSettings[columnId].split("##")[1];
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
      case "percent":
        return parseFloat(data).toFixed(2) + "%";
    }
  }
}
