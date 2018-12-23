import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ServerService } from '../../../server.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  creditCardForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serverService: ServerService) {
      this.creditCardForm = formBuilder.group({
          'cvv': ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
          'cardNumber': ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
          'summary': ['', [Validators.required, Validators.min(1000), Validators.max(75000)]],
          'comment': ['', [Validators.required, Validators.maxLength(150)]],
          'email': ['', [Validators.required, Validators.email]],
          'date': ['', [Validators.required, Validators.pattern('^[0-1][0-9]/[0-9]{4}$')]]
      });
  }

  submit() {
    const value_to_send = this.creditCardForm.value;
    value_to_send['isSecure'] = true;
    this.serverService.storeCardPayments(value_to_send)
    .subscribe(
      (responce) => {console.log('success'); console.log(responce); },
      (error) =>  {console.log('error'); console.log(error); }
      );
    console.log(this.creditCardForm);
  }

  ngOnInit() {
  }
}

