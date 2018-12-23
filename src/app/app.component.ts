import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login = '';
  passw = '';

  constructor() {
  }

  checklogin() {
    return 'admin' === this.login && 'adminpassword' === this.passw;
  }
}

