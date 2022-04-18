import {Injectable, OnInit} from "@angular/core";
import {DataService} from "./data.service";
import {AuthData} from "../models/auth-data.model";

@Injectable({providedIn: "root"})
export class AuthService extends DataService implements OnInit {

  ngOnInit(): void {
    this.subscribeToSignUp();
  }


  subscribeToSignUp() {
    this.subscribeTo('user/signup');
  }

  createUser(email: string, password: string) {

    const user: AuthData = {email: email, password: password};
    this.postData('user/signup', user);

  }

}
