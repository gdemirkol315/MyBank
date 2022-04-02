import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "./src/app/posts/post-list/post-list.component";
import {PostCreateComponent} from "./src/app/posts/post-create/post-create.component";
import {NewLoanComponent} from "./src/app/new-loan-form/new-loan.component";

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent
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
