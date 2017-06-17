import { User } from './../../model/model';
import { UserService } from './../../service/userService';
import { AboutUsComponent } from './../aboutus/aboutus.component';
import { ContactUsComponent } from './../contactus/contactus.component';
import { UserAgreementComponent } from './../userAgreement/useragreement.component';
import { CooperationComponent } from './../cooperation/cooperation.component';
import { PayBackComponent } from './../payback/payback.component';
import { GameLogComponent } from './../gamelog/gamelog.component';
import { FeedBackComponent } from './../feedback/feedback.component';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'user-center',
    templateUrl: './userCenter.component.html',
    styleUrls: ['./userCenter.component.scss']
})
export class UserCenterComponent {
    constructor(
        public nav: NavController,
        private userSvr: UserService
    ) {
        this.currentUser = this.userSvr.CurrentUser;
    }
    currentUser: User = <any>{}
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
            component: PayBackComponent
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

    userFunction(id) {
        let func = this.userFunctions.find((item) => {
            return item.id == id;
        });
        if (func) {
            this.nav.push(func.component);
        }
    }
}