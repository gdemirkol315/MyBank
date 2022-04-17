import {Injectable, Type} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DataService {

  // @ts-ignore
  private _dataSubject = new Subject<Type[]>();

  constructor(private http: HttpClient) {
  }

  subscribeTo(apiURLExtension:string) {
    this.http
      .get<{ message: string; dataSet: any }>(
        'http://localhost:3000/api/' + apiURLExtension
      )
      .subscribe(result => {
        this._dataSubject.next(result.dataSet);
      });
  }

  getObservable() {
    return this._dataSubject.asObservable();
  }


  // @ts-ignore
  get dataSubject(): Subject<Type> {
    return this._dataSubject;
  }
}
