import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "../../app-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NewLoanComponent} from "./components/new-loan/new-loan.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {PeriodDropdownComponent} from './components/period-dropdown/period-dropdown.component';
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {AlertComponent} from "./components/alert/alert.component";
import {AuthInterceptor} from "./interceptors/auth-interceptor";
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import {TableComponent} from "./components/table/table.component";
import {MatTableModule} from "@angular/material/table";
import {TestComponent} from "./components/test/test.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {CustomerProfileComponent} from "./components/customer-profile/customer-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewLoanComponent,
    PeriodDropdownComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    CustomerFormComponent,
    DropdownComponent,
    TableComponent,
    TestComponent,
    CustomerProfileComponent,
    TestComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
