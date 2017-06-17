import { ContentManage } from './../../service/contentmanage';
import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'user-agreement',
    templateUrl: './useragreement.component.html',
    styleUrls: ['./useragreement.componnet.scss']
})
export class UserAgreementComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage
    ) { }

    agreement: any = {}

    ngOnInit() {
        this.contentSvr.getAgreement().subscribe(data => {
            this.agreement = data.json().data;
        });
    }

    back() {
        this.navCtrl.pop();
    }
}