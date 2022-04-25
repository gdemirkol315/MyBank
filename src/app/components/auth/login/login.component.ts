import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  username: string;
  password: string;
  isLoading = false;
  private invalidLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {

  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.getObservableToken().subscribe(
        tokenChange => {
          console.log('tokenchange:' + tokenChange);
        }
      )
      this.authService.login(form['email'], form['password']);

    }
  }
}
