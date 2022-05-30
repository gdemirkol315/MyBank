import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {first} from "rxjs";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {

  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.getAuthStatusListener().pipe(first()).subscribe(
        tokenChange => {
          if (this.authService.isAuthenticated()) {
            this.router.navigate(['/newloan']);
          } else {
            this.alertService.error(this.authService.errorMessage,{ autoClose: true });
          }
        }
      )
      this.authService.login(form['email'], form['password']);
    }
  }
}
