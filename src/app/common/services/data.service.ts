import {Injectable, Type} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DataService {

  // @ts-ignore
  public dataSubject = new Subject<Type[]>();


  constructor(private http: HttpClient) {
  }

  getData(apiURLExtension:string) {
    this.http
      .get<{ message: string; dataSet: any }>(
        'http://localhost:3000/api/' + apiURLExtension
      )
      .subscribe(result => {
        this.dataSubject.next(result.dataSet);
      });
  }


  getDataUpdateListener() {
    return this.dataSubject.asObservable();
  }

}
