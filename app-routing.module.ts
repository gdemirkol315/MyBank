import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewLoanComponent} from "./src/app/components/new-loan-form/new-loan.component";
import {LoginComponent} from "./src/app/components/auth/login/login.component";
import {SignupComponent} from "./src/app/components/auth/signup/signup.component";
import {AuthGuard} from "./src/app/guard/auth.guard";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'newloan',
    component: NewLoanComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
