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

    usergameLog = {};

    ionViewWillEnter() {
        this.getGameLog();
    }

    getGameLog() {
        this.userSvr.getUserBets().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.usergameLog = result.data;
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
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                    this.goBack();
                }, "获取游戏记录失败");
            }
        )
    }

    goBack() {
        this.nav.pop();
    }
}