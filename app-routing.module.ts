import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewLoanComponent} from "./src/app/components/new-loan-form/new-loan.component";
import {LoginComponent} from "./src/app/components/auth/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'newloan',
    component: NewLoanComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
