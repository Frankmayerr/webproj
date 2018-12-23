import { Component, OnInit } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login = '';
  passw = '';
  mode: string;
  constructor(private admin: AdminComponent) {
    this.mode = 'Админ';
  }

  checklogin() {
    return 'admin' === this.login && 'pas' === this.passw;
  }

  modef() {
    return this.mode;
  }

  click_cards() {
    this.admin.getcarddata();
  }

  changeMode() {
    if (this.mode === 'Админ' && this.checklogin()) {
      this.mode = 'Контент';
    } else if (this.mode === 'Контент') {
      this.mode = 'Админ';
    }
  }
}

