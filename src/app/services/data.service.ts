import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DataService {

  private _dataSubjectGet = new Subject<any[]>();
  private _dataSubjectPost = new Subject<any[]>();
  private localhost = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }

  protected postData(apiURLExtension: string, data) {
    return this.http.post(this.localhost + apiURLExtension, data);
  }

  protected getData(apiURLExtension: string) {
    return this.http
      .get(
        this.localhost + apiURLExtension
      )
  }

  protected subscribeToGet(apiURLExtension: string) {
    this.http
      .get<{ message: string; dataSet: any }>(
        this.localhost + apiURLExtension
      )
      .subscribe(result => {
        this._dataSubjectGet.next(result.dataSet);
      });
  }

  protected getObservableGet() {
    return this._dataSubjectGet.asObservable();
  }

  protected subscribeToPost(apiURLExtension: string, postObject) {
    this.http
      .post<{ message: string, dataSet: any }>(
        this.localhost + apiURLExtension, postObject
      )
      .subscribe(result => {
        this._dataSubjectPost.next(result.dataSet);
      });
  }

  protected getObservablePost() {
    return this._dataSubjectPost.asObservable();
  }

}
