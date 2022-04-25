import {Injectable, OnInit} from "@angular/core";
import {DataService} from "./data.service";
import {AuthData} from "../models/auth-data.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService extends DataService implements OnInit {

  private token = new Subject<boolean>();

  ngOnInit(): void {
    this.subscribeToSignUp();
  }


  subscribeToSignUp() {
    this.subscribeTo('user/signup');
  }

  createUser(email: string, password: string) {

    const user: AuthData = {email: email, password: password};
    return this.postData('user/signup', user);

  }

  login(email: string, password: string) {
    const user: AuthData = {email: email, password: password};
    this.postData('user/login', user).subscribe(responseWithToken => {
      this.setToken(responseWithToken);
    });
  }

  logout(){
    localStorage.removeItem('token');
  }

  setToken(responseWithToken) {
    if (responseWithToken && responseWithToken['token']) {
      this.token.next(responseWithToken['token']);
      localStorage.setItem('token', responseWithToken['token']);
    }
  }

  getObservableToken() {
    return this.token.asObservable();
  }


}
