import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'intro-detail',
    templateUrl: './introdetail.component.html',
    styleUrls: ['./introdetail.component.scss']
})
export class IntroDetailComponent {
    constructor(
        public navCtrl: NavController
    ) { }

    goBack() {
        this.navCtrl.pop();
    }
}