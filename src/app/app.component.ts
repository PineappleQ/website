import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  indexPage: any;
  ngOnInit() {
    let loginData = localStorage.getItem("logindata");
    if (loginData) {
      this.indexPage = IndexComponent;
    } else {
      this.indexPage = LoginComponent;
    }
  }
}
