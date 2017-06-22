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
    plays = [
        {
            id: 'Lucky28',
            name: '幸运28'
        },
        {
            id: 'Denmark28',
            name: '丹麦28'
        },
        {
            id: 'Canada28',
            name: '加拿大28'
        }
    ]
    goBack() {
        this.navCtrl.pop();
    }

    goDetailPage(play) {
        this.navCtrl.push(this.detailPage, {
            id: play.id
        })
    }
}