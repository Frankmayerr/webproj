import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PaymentComponent } from './content/payment/payment.component';
import { CardComponent } from './content/payment/card/card.component';
import { BankComponent } from './content/payment/bank/bank.component';
import { PaymentRequestComponent } from './content/payment-request/payment-request.component';
import { ContentComponent } from './content/content.component';
import {ServerService} from './server.service';
import {HttpModule} from '@angular/http';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
