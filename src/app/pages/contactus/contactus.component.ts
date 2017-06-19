import { ContentManage } from './../../service/contentmanage';
import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'contact-us',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.scss']
})
export class ContactUsComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage,
        private alertCtrl: AlertController
    ) { }

    contact: any = {}

    ngOnInit() {
        this.contentSvr.getContactUs().subscribe(
            data => {
                this.contact = data.json().data;
            },
            error => {
                this.contentSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取联系我们信息失败");
            }
        )
    }

    goBack() {
        this.navCtrl.pop();
    }
}