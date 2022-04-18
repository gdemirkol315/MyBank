import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {

  isLoading = false;

  constructor(private authService:AuthService) {
  }

  onSignUp(form: NgForm) {
    this.authService.createUser(form.value.email, form.value.password)
  }
}
