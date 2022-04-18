import {Injectable, Type} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DataService {

  // @ts-ignore
  private _dataSubject = new Subject<Type[]>();
  private localhost = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }

  protected postData(apiURLExtension: string, data) {
    this.http.post(this.localhost + apiURLExtension, data).subscribe(response => {
      console.log(response)
    });
  }

  protected subscribeTo(apiURLExtension: string) {
    this.http
      .get<{ message: string; dataSet: any }>(
        this.localhost + apiURLExtension
      )
      .subscribe(result => {
        this._dataSubject.next(result.dataSet);
      });
  }

  protected getObservable() {
    return this._dataSubject.asObservable();
  }

  // @ts-ignore
  protected get dataSubject(): Subject<Type> {
    return this._dataSubject;
  }
}
