import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  constructor(private serverService: ServerService) { }

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
    console.log('cardddd');
    this.Cards = new Array();
    this.serverService.getCardPayments()
    .subscribe(x => {
      console.log(x);
      Object.keys(x).forEach(p => this.Cards.push(this.handle_card_json(x[p])));
    });
  }


  getreqdata() {
    console.log('reqqq');
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
