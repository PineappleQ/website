import { ContentManage } from './../../service/contentmanage';
import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'user-agreement',
    templateUrl: './useragreement.component.html',
    styleUrls: ['./useragreement.componnet.scss']
})
export class UserAgreementComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage,
        private alertCtrl: AlertController
    ) { }

    agreement: any = {}

    ngOnInit() {
        this.contentSvr.getAgreement().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.agreement = result.data;
                }
            },
            error => {
                this.contentSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取用户协议失败");
            }
        );
    }

    back() {
        this.navCtrl.pop();
    }
}