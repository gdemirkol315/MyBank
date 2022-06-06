import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {

  registered = false;
  private route: ActivatedRoute;

  constructor(private authService: AuthService, private router: Router, private  alertService: AlertService) {
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.createUser(form.value.email, form.value.password)
        .subscribe(
        response => {
          if (response['message'] === 'User created!') {
            this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            this.router.navigate(['/login'], { relativeTo: this.route });
          }
        }
      );
    }

  }
}
