import { UserService } from './../../service/userService';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'game-log',
    templateUrl: './gamelog.component.html',
    styleUrls: ['./gamelog.component.scss']
})
export class GameLogComponent {
    constructor(
        public nav: NavController,
        private userSvr: UserService,
        private alertCtrl: AlertController
    ) { }

    gameLog = <any>{};
    bets = [];
    pageIndex = 0;
    pageLength = 20;
    canScroll = false;
    ionViewWillEnter() {
        this.getGameLog();
    }

    getGameLog() {
        this.userSvr.getUserBets({limit: 1000}).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.gameLog = result.data;
                    if (this.gameLog.bets) {
                        if (this.gameLog.bets.length > this.pageLength) {
                            this.bets = this.gameLog.bets.slice(0, this.pageLength);
                            this.canScroll = true;
                            this.pageIndex++;
                        } else {
                            this.bets = this.gameLog.bets;
                        }
                    }

                } else {
                    let msg = result.message ? result.message : "获取游戏记录失败";
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }
            },
            error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let that = this;
                    let alert = this.alertCtrl.create({
                        message: msg,
                        buttons: [
                            {
                                text: '确定',
                                handler: () => {
                                    that.goBack();
                                }
                            }
                        ]
                    });
                    alert.present();
                }, "获取游戏记录失败");
            }
        )
    }

    doInfinite(infiniteScroll) {
        if (!this.canScroll) {
            infiniteScroll.enable(false);
            return;
        }
        let start = this.pageIndex * this.pageLength;
        let end = start + this.pageLength;
        let afterData = this.gameLog.bets.slice(start, end);
        this.bets = this.bets.concat(afterData);
        infiniteScroll.complete();
        if (afterData.length < this.pageLength) {
            infiniteScroll.enable(false);
            this.canScroll = false;
        } else {
            this.pageIndex++;
        }
    }

    goBack() {
        this.nav.pop();
    }
}