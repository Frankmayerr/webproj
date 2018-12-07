import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  NDS = 'без НДС';
  getNDS(feature: string) {
    this.NDS = feature;
  }

  bankFieldForm : FormGroup;
  constructor(private formBuilder: FormBuilder){
    
      this.bankFieldForm = formBuilder.group({
          "sender": ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
          "bik": ["", [Validators.required, Validators.pattern("^[0-9]{9}$")]],
          "money": ["", [Validators.required, Validators.min(1000), Validators.max(75000), Validators.maxLength(5)]],
      });
  }

  submit(){
    console.log(this.bankFieldForm);
}
  ngOnInit() {
  }

}
