import { UserService } from './../../service/userService';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'feed-back',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedBackComponent {
    constructor(
        public nav: NavController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private userSvr: UserService
    ) { }

    feedBackTitle = "";
    feedBackContent = ""
    feedBack() {
        if (!this.feedBackContent) {
            let toast = this.toastCtrl.create({
                message: '请输入意见内容',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return
        }
        let params = {
            title: this.feedBackTitle,
            content: this.feedBackContent
        }
        this.userSvr.submitUserFeedback(params).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    let toast = this.toastCtrl.create({
                        message: result.message,
                        duration: 3000,
                        position: 'top',
                        cssClass: 'bggreen'
                    });
                    toast.present();
                    this.goBack();
                }
            },
            error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "提交意见反馈失败");
            }
        )
    }
    goBack() {
        this.nav.pop();
    }
}