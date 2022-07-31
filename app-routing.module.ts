import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewLoanComponent} from "./src/app/components/new-loan/new-loan.component";
import {LoginComponent} from "./src/app/components/auth/login/login.component";
import {SignupComponent} from "./src/app/components/auth/signup/signup.component";
import {AuthGuard} from "./src/app/guard/auth.guard";
import {NotFoundComponent} from "./src/app/components/not-found/not-found.component";
import {CustomerFormComponent} from "./src/app/components/customer-form/customer-form.component";
import {CustomerProfileComponent} from "./src/app/components/customer-profile/customer-profile.component";
import {GetLoanComponent} from "./src/app/components/get-loan/get-loan.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
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
    path: 'customer/:customerId/:loanId',
    component: GetLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:customerId',
    component: CustomerProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
