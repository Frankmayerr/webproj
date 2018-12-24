import { Component, OnInit } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    var config = {
      apiKey: "AIzaSyBpLnUPtZhAcUNhxYurGdNMTOPPevBtluw",
      authDomain: "webprojgladkikh.firebaseapp.com",
      databaseURL: "https://webprojgladkikh.firebaseio.com",
      projectId: "webprojgladkikh",
      storageBucket: "webprojgladkikh.appspot.com",
      messagingSenderId: "548664958146"
    };
    firebase.initializeApp(config);
  }


}

