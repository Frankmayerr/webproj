import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {

  isActual;
  constructor() {
    this.isActual = false;
   }

  ngOnInit() {
  }

}
