import { PlayService } from './../../service/playService';
import { TrendDetailComponent } from './../trendDetail/trendDetail.component';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular'
@Component({
    selector: 'trend',
    templateUrl: './trend.component.html',
    styleUrls: ['./trend.component.scss']
})
export class TrendComponent {
    constructor(
        public nav: NavController,
        private playSvr: PlayService,
        private alertCtrl: AlertController
    ) { }
    trendDetail: any = TrendDetailComponent;

    plays = [];

    navDetail(item) {
        this.nav.push(this.trendDetail, {
            playType: item
        });
    }

    ionViewWillEnter() {
        this.getPlays();
    }

    getPlays() {
        this.playSvr.getPlayTypes().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.plays = result.data;
                }
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取玩法列表失败");
            }
        );
    }
}