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
        public nav: NavController
    ) { }

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