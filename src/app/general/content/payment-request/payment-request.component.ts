import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ServerService } from '../../../server.service';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private serverService: ServerService) {
      this.requestFieldForm = formBuilder.group({
          'sender': ['', [Validators.required, Validators.pattern('^([0-9]{10}|[0-9]{12})$')]],
          'bik': ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
          'money': ['', [Validators.required, Validators.min(1000), Validators.max(75000)]],
          'cardNumber': ['', [Validators.required, Validators.pattern('^[0-9]{20}$')]],
          'phone': ['+7', [Validators.required, Validators.pattern('[+]{1}[7]{1}[0-9]{10}')]],
          'nds' : [this.NDS]
      });
  }

  NDS = 'без НДС';

  requestFieldForm: FormGroup;

  getNDS(feature: string) {
    this.NDS = feature;
  }

  submit() {
    const value_to_send = this.requestFieldForm.value;
    this.serverService.storeRequests(value_to_send)
    .subscribe(
      (responce) => {console.log('success'); console.log(responce); },
      (error) =>  {console.log('error'); console.log(error); }
      );
    console.log(this.requestFieldForm);
  }

  ngOnInit() {
  }

}
