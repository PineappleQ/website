import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'intro-detail',
    templateUrl: './introdetail.component.html',
    styleUrls: ['./introdetail.component.scss']
})
export class IntroDetailComponent {
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams
    ) { }

    play: any = {};

    ionViewWillEnter() {
        let id = this.navParams.get('id');
        this.play = this.plays.find(p => {
            return p.id == id;
        });
    }

    plays = [
        {
            id: 'Lucky28',
            name: '幸运28',
            title: '幸运28玩法介绍'
        },
        {
            id: 'Denmark28',
            name: '丹麦28',
            title: '丹麦28玩法介绍'
        },
        {
            id: 'Canada28',
            name: '加拿大28',
            title: '加拿大28玩法介绍'
        }
    ]

    goBack() {
        this.navCtrl.pop();
    }
}