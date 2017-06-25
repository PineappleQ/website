import { UserService } from './../../service/userService';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'my-payback',
    templateUrl: './mypayback.component.html',
    styleUrls: ['./mypayback.component.scss']
})
export class MyPayBackComponent {
    constructor(
        public nav: NavController,
        private alertCtrl: AlertController,
        private userSvr: UserService
    ) { }

    ionViewWillEnter() {
        this.getRebates();
    }

    rebates = [];

    getRebates() {
        this.userSvr.getUserRebates().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.rebates = result.data.bates;
                }
            },
            error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取返利数据失败")
            }
        )
    }

    goBack() {
        this.nav.pop();
    }
}