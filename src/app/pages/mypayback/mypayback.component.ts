import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'my-payback',
    templateUrl: './mypayback.component.html',
    styleUrls: ['./mypayback.component.scss']
})
export class MyPayBackComponent {
    constructor(
        public nav: NavController
    ) { }

    goBack() {
        this.nav.pop();
    }
}