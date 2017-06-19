import { NavController, AlertController } from 'ionic-angular';
import { ContentManage } from './../../service/contentmanage';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'system-notify',
    templateUrl: './systemnotify.component.html',
    styleUrls: ['./systemnotify.component.scss']
})
export class SystemNotifyComponent implements OnInit {
    constructor(
        private contentSvr: ContentManage,
        public navCtrl: NavController,
        private alertCtrl: AlertController
    ) { }
    header: string = "";
    notifies = [];

    ngOnInit() {
        this.getNotifies();
    }
    /**
     * 获取系统公告
     */
    getNotifies() {
        this.contentSvr.getSystemNotify().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    let info = result.data;
                    this.notifies.push(info);
                }
            },
            error => {
                this.contentSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取系统公告失败");
            }
        );
    }

    back() {
        this.navCtrl.pop();
    }
}