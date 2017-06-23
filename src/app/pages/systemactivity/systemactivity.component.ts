import { ContentManage } from './../../service/contentmanage';
import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'system-activity',
    templateUrl: './systemactivity.component.html',
    styleUrls: ['./systemactivity.component.scss']
})
export class SystemActivityComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage,
        private alertCtrl: AlertController
    ) { }

    activities = [];

    ngOnInit() {
        this.contentSvr.getSystemActivity().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.activities = result.data;
                }
            },
            error => {
                this.contentSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取系统活动失败");
            }
        );
    }

    back() {
        this.navCtrl.pop();
    }
}