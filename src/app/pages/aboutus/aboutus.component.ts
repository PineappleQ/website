import { ContentManage } from './../../service/contentmanage';
import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'about-us',
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.scss']
})
export class AboutUsComponent implements OnInit {

    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage,
        private alertCtrl: AlertController
    ) { }

    about: any = {}

    ngOnInit() {
        this.contentSvr.getAboutUs().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.about = result.data;
                }
            },
            error => {
                this.contentSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取关于我们的信息失败");
            }
        )
    }
    goBack() {
        this.navCtrl.pop();
    }
}