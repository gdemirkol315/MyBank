import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewLoanComponent} from "./src/app/components/new-loan-form/new-loan.component";

const routes: Routes = [
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
