import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  username: string;
  password: string;
  private invalidLogin: boolean;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {

  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.getAuthStatusListener().subscribe(
        tokenChange => {
          if (this.authService.isAuthenticated()) {
            this.router.navigate(['/newloan']);
          } else {
            this.alertService.error(this.authService.errorMessage);
          }
        }
      )
      this.authService.login(form['email'], form['password']);
    }
  }
}
