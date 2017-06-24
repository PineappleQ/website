import { PlayService } from './../../service/playService';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
    selector: 'trend-detail',
    templateUrl: './trendDetail.component.html',
    styleUrls: ['./trendDetail.component.scss']
})
export class TrendDetailComponent {
    constructor(
        public nav: NavController,
        private navParams: NavParams,
        private playSvr: PlayService,
        private alertCtrl: AlertController
    ) { }

    title: string = "";
    private limit = 500;
    trendData;
    ionViewWillEnter() {
        let item = this.navParams.get("playType");
        if (!item) {
            let alert = this.alertCtrl.create({
                message: '获取详情失败，请重试',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            this.back();
                        }
                    }
                ]
            });
            alert.present();
        } else {
            this.title = `${item.text}开奖预测`;
            this.getTrend(item);
        }
    }

    getTrend(item) {
        this.playSvr.getTrendData(item.id, this.limit).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.trendData = result.data;
                }
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, '获取开奖趋势数据失败');
            }
        )
    }

    back() {
        this.nav.pop();
    }
}