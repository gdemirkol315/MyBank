import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {first} from "rxjs";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {

  }

  ngOnInit() {
    const isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      this.router.navigate(['/customer']);
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.getAuthStatusListener().pipe(first()).subscribe(
        tokenChange => {
          if (this.authService.isAuthenticated()) {
            this.router.navigate(['/customer']);
          } else {
            this.alertService.error(this.authService.errorMessage,{ autoClose: true });
          }
        }
      )
      this.authService.login(form['email'], form['password']);
    }
  }
}
