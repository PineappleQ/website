import { IndexComponent } from './pages/index/index.component';
import { Component } from '@angular/core';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  indexPage: any = IndexComponent;
}
