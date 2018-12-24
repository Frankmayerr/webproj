import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  CardForm: FormGroup;
  ReqForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serverService: ServerService) {
    this.CardForm = formBuilder.group({
      'column': ['', [Validators.required]],
      'value' : ['', [Validators.required]],
  });
  this.ReqForm = formBuilder.group({
    'column': ['', [Validators.required]],
    'value' : ['', [Validators.required]],
  });
  }

  Cards: Array<Card>;
  Requests: Array<any>;

  ngOnInit() {
  }

  handle_card_json(json_obj) {
    let id = '';
    let isSecure = 'true';
    const result = new Array();
    Object.keys(json_obj).map(function(k) {
      if (k === 'id') { id = json_obj[k];
      } else if (k === 'IsSecure') { isSecure = json_obj[k];
       } else { result.push(json_obj[k]); }
    });
    return new Card(id, isSecure, result);
  }

  handle_request_json(json_obj) {
    const result = new Array();
    Object.keys(json_obj).map(function(k) {
      result.push(json_obj[k]);
    });
    return result;
  }


  getcarddata() {
    this.Cards = new Array();
    this.serverService.getCardPayments()
    .subscribe(x => {
      console.log(x);
      Object.keys(x).forEach(p => this.Cards.push(this.handle_card_json(x[p])));
    });
  }


  getreqdata() {
    this.Requests = new Array();
    this.serverService.getRequests()
    .subscribe(x => {
      console.log(x);
      Object.keys(x).forEach(p => this.Requests.push(this.handle_request_json(x[p])));
      console.log(this.Requests);
    });
  }

  changecardinfo(card) {
    this.serverService.changeSecurityInfo(card.Id)
    .subscribe(
      (responce) => {
        if (card.IsSecure == 'true') card.IsSecure = 'false';
        else card.IsSecure = 'true';
      },
      (error) =>  {console.log('error'); console.log(error); }
      );
  }

  arraysEqual(a, b) {
    if (a === b) { return true; }
    if (a == null || b == null) { return false; }
    if (a.length !== b.length) { return false; }
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }

  sorttable(field) {
    this.Cards = new Array();
     this.serverService.sorttable(field)
     .subscribe(x => { Object.keys(x).forEach(p => this.Cards.push(this.handle_card_json(x[p]))); }
     , err => console.log(err));
  }

  sortreq(field) {
    this.Requests = new Array();
     this.serverService.sortreq(field)
     .subscribe(x => { Object.keys(x).forEach(p => this.Requests.push(this.handle_request_json(x[p]))); }
     , err => console.log(err));
  }

  reqsubmit() {
    this.Requests = new Array();
    this.serverService.filterreq(this.ReqForm.value['column'], this.ReqForm.value['value'])
    .subscribe(x => { Object.keys(x).forEach(p => this.Requests.push(this.handle_request_json(x[p]))); }
     , err => console.log(err));
  }

  cardsubmit() {
    this.Cards = new Array();
    this.serverService.filtercard(this.CardForm.value['column'], this.CardForm.value['value'])
    .subscribe(x => { Object.keys(x).forEach(p => this.Cards.push(this.handle_card_json(x[p]))); }
     , err => console.log(err));
  }

  choosecardfilter(column) {
    this.CardForm.value['column'] = column;
  }
  choosecardvalue(value) {
    this.CardForm.value['value'] = value;
  }

  choosereqfilter(column) {
    this.ReqForm.value['column'] = column;
  }
  choosereqvalue(value) {
    this.ReqForm.value['value'] = value;
  }
}

export class Card {
  Id: string;
  IsSecure: string;
  Props: Array<any>;

  constructor(id: string, isSecure: string, props: Array<any>) {
    this.Id = id;
    this.IsSecure = isSecure,
    this.Props = props;
  }
}
