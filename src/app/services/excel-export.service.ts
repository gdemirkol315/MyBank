import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import {Injectable} from "@angular/core";


@Injectable({providedIn: "root"})
export class ExcelExportService {
  public static exportExcel(wbName, headers, dataArray) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(wbName);
    let columnKeys = Object.keys(headers);
    worksheet.columns = columnKeys.map(column => {
      return {
        header: column,
        key: column,
        width: 30
      }
    });

    dataArray.forEach(data => {
      let dataObj = new Object();
      columnKeys.forEach(column => {
        dataObj[column] = data[column]
      })
      worksheet.addRow(dataObj);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, wbName + '.xlsx');
    })

  }
}
