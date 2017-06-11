import { MyPayBackComponent } from './../mypayback/mypayback.component';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'pay-back',
    templateUrl: './payback.component.html',
    styleUrls: ['./payback.component.scss']
})
export class PayBackComponent {
    constructor(
        public nav: NavController
    ) { }
    myPaybackPage: any = MyPayBackComponent;
    goBack() {
        this.nav.pop();
    }
    myPayBack() {
        this.nav.push(this.myPaybackPage);
    }
}