import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { ContentComponent } from './general/content/content.component';
import { HeaderComponent } from './general/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './general/content/payment/payment.component';
import { CardComponent } from './general/content/payment/card/card.component';
import { BankComponent } from './general/content/payment/bank/bank.component';
import { PaymentRequestComponent } from './general/content/payment-request/payment-request.component';
import { AdminGuard } from './auth/auth-guards/admin-guard.service';
import { SigninGuard } from './auth/auth-guards/signin-guard.service';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'general', component: GeneralComponent, children: [
      { path: 'header', component: HeaderComponent },
        { path: 'content', component: ContentComponent, children: [
              { path: 'requests', component: PaymentRequestComponent },
              { path: 'payments', component: PaymentComponent, children: [
                      { path: 'by-card', component: CardComponent },
                      { path: 'by-internet-bank', component: BankComponent }
              ]},
        ]},
        { path: 'footer', component: FooterComponent}
    ], canActivate: [SigninGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
