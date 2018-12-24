import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ServerService } from '../../../../server.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private serverService: ServerService) {
      this.bankFieldForm = formBuilder.group({
          'sender': ['', [Validators.required, Validators.pattern('^([0-9]{10}|[0-9]{12})$')]],
          'bik': ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
          'money': ['', [Validators.required, Validators.min(1000), Validators.max(75000)]],
          'nds': [ this.NDS ],
      });
  }
  NDS = 'без НДС';

  bankFieldForm: FormGroup;
  getNDS(feature: string) {
    this.NDS = feature;
    this.bankFieldForm.controls['nds'].setValue(feature);
  }

  downloadFile(responce) {
    const blob = new Blob([responce.data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  submit() {
    const p = this.serverService.getFile(this.bankFieldForm.value)
      .subscribe(
      (responce) => {console.log(responce); this.downloadFile(responce); },
      (error) =>  {console.log('error'); console.log(error); }
      );
  }
  ngOnInit() {
  }

}
