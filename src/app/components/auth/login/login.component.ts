import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  username: string;
  password: string;
  isLoading = false;

  constructor(private authService: AuthService) {

  }

  onLogin(form: NgForm) {
    if (form.invalid){
      return;
    } else {
      this.authService.login(form.value.email,form.value.password);
    }
  }
}
