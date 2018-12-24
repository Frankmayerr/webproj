import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userCompany: string;
  public userName: string;
  public userPhone: string;
  public userSite: string;
  public userEmail: string;
  constructor() {
      this.userName = 'Швецова Мария Валерьевна';
      this.userCompany = 'Индивидуальный предприниматель';
      this.userEmail = 'mary@tochka.com';
      this.userSite = 'www.mary.com';
      this.userPhone = '+79193977777';
  }
  ngOnInit() {
  }

}
