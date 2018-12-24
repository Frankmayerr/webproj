import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './general/header/header.component';
import { PaymentComponent } from './general/content/payment/payment.component';
import { CardComponent } from './general/content/payment/card/card.component';
import { BankComponent } from './general/content/payment/bank/bank.component';
import { PaymentRequestComponent } from './general/content/payment-request/payment-request.component';
import { ContentComponent } from './general/content/content.component';
import {ServerService} from './server.service';
import {HttpModule} from '@angular/http';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { SigninGuard } from './auth/auth-guards/signin-guard.service';
import {AdminGuard} from './auth/auth-guards/admin-guard.service';
import { GeneralComponent } from './general/general.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaymentComponent,
    CardComponent,
    BankComponent,
    PaymentRequestComponent,
    ContentComponent,
    FooterComponent,
    AdminComponent,
    AuthComponent,
    SigninComponent,
    GeneralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [ServerService, AdminComponent, AuthComponent, AuthService, SigninGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
