import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewLoanComponent} from "./src/app/components/new-loan/new-loan.component";
import {LoginComponent} from "./src/app/components/auth/login/login.component";
import {SignupComponent} from "./src/app/components/auth/signup/signup.component";
import {AuthGuard} from "./src/app/guard/auth.guard";
import {CustomerComponent} from "./src/app/components/customer/customer.component";


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
  },
  {
    path: 'customer',
    component: CustomerComponent,
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
