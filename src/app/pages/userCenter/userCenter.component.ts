import { ShareComponent } from './../share/share.component';
import { MyPayBackComponent } from './../mypayback/mypayback.component';
import { User } from './../../model/model';
import { UserService } from './../../service/userService';
import { AboutUsComponent } from './../aboutus/aboutus.component';
import { ContactUsComponent } from './../contactus/contactus.component';
import { UserAgreementComponent } from './../userAgreement/useragreement.component';
import { CooperationComponent } from './../cooperation/cooperation.component';
import { GameLogComponent } from './../gamelog/gamelog.component';
import { FeedBackComponent } from './../feedback/feedback.component';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'user-center',
    templateUrl: './userCenter.component.html',
    styleUrls: ['./userCenter.component.scss']
})
export class UserCenterComponent {
    constructor(
        public nav: NavController,
        private userSvr: UserService,
        private alertCtrl: AlertController
    ) { }
    currentUser = <any>{}
    baseUrl = this.userSvr.baseUrl;
    userFunctions = [
        {
            id: 'gamelog',
            name: '游戏记录',
            component: GameLogComponent
        },
        {
            id: 'feedback',
            name: '意见反馈',
            component: FeedBackComponent
        },
        {
            id: 'payback',
            name: '回水系统',
            component: MyPayBackComponent
        },
        {
            id: 'cooperation',
            name: '代理功能',
            component: CooperationComponent
        },
        {
            id: 'useragreement',
            name: '用户协议',
            component: UserAgreementComponent
        },
        {
            id: 'share',
            name: '我要分享',
            component: ShareComponent
        },
        {
            id: 'contactus',
            name: '联系我们',
            component: ContactUsComponent
        },
        {
            id: 'aboutus',
            name: '关于我们',
            component: AboutUsComponent
        }
    ]

    ionViewWillEnter(){
        this.getUserInfo();
    }

    userFunction(id) {
        let func = this.userFunctions.find((item) => {
            return item.id == id;
        });
        if (func) {
            this.nav.push(func.component);
        }
    }

    async getUserInfo() {
        let user:any = this.userSvr.CurrentUser;
        let userId = user.user.id;
        this.userSvr.getUserInfo(userId).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.currentUser = result.data;
                }
            },
            error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取用户信息失败");
            }
        )
    }
}