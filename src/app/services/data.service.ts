import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DataService {

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


}
