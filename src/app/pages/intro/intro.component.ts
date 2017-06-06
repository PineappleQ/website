import { IntroDetailComponent } from './../introdetail/introdetail.component';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
    constructor(
        public navCtrl: NavController
    ) { }
    
    detailPage: any = IntroDetailComponent;

    goBack() {
        this.navCtrl.pop();
    }

    goDetailPage() {
        this.navCtrl.push(this.detailPage)
    }
}