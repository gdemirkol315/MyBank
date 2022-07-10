import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

//TODO: Improve link handling. This is not Clean!!!

export class TableComponent implements OnInit {
  //TODO: create new attribute for column definitions
  /**
   * This component supplies generic approach for creating tables in angular.
   *
   * @param  dataSource  is an array of JSON objects that will fill the table.
   *                     First item in the array must have the column settings, as example below.
   *                     technical name should be passed as key and setting must be separated by ##
   *                     {
   *                        key: header name##column data type##link address##?link address extension variable?,
   *                        secondKey:...
 *                        }
   *                     {
   *                        "id": "Id##text##customer##?customerId?",
   *                        "principalPayment": "Principal Payment##amount"
   *                     }
   */
  @Input() dataSource;
  @Input() columnSettings;
  columnKeys: string[]

  ngOnInit(): void {
      this.columnKeys = Object.keys(this.columnSettings);
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

  getLink(columnKey: string, element) {
    let prefixes = [];

    for (let i = 2; i < this.columnSettings[columnKey].split("##").length; i++) {
      let prefix: string = this.columnSettings[columnKey].split("##")[i];

      if (prefix.startsWith('?') && prefix.endsWith('?')){
        prefixes.push(element[prefix.replaceAll('?','')])
      } else {
        prefixes.push(this.columnSettings[columnKey].split("##")[i]);
      }
    }
    return prefixes.join("/");
  }

  isLink(columnKey: string) {
    if (this.columnSettings[columnKey].split("##")[2] == undefined)
      return false;
    return true;
  }
}
