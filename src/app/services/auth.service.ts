import {Injectable, OnInit} from "@angular/core";
import {DataService} from "./data.service";
import {AuthData} from "../models/auth-data.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({providedIn: "root"})
export class AuthService extends DataService implements OnInit {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private jwtHelper: JwtHelperService;

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
    const authData: AuthData = {email: email, password: password};
    this.postData('user/login', authData).subscribe(responseWithToken => {
      if (responseWithToken && responseWithToken['token']) {
        this.token = responseWithToken['token'];
        this.authStatusListener.next(true);
        localStorage.setItem('token', responseWithToken['token']);
      }
    });
  }

  logout() {
    this.token = null;
    this.authStatusListener.next(false);
    localStorage.removeItem('token');
  }


  getToken() {
    return this.token;
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public isAuthenticated() {
    return localStorage.getItem('token')==null?false:true;
  }
}
