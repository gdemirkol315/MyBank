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
import {NewLoanComponent} from "./components/new-loan-form/new-loan.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {CurrencyDropdownComponent} from './components/currency-dropdown/currency-dropdown.component';
import {PeriodDropdownComponent} from './components/period-dropdown/period-dropdown.component';
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {AlertComponent} from "./components/alert/alert.component";
import {AuthInterceptor} from "./interceptors/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewLoanComponent,
    CurrencyDropdownComponent,
    PeriodDropdownComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent
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
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
