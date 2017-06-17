import { ContentManage } from './../../service/contentmanage';
import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'contact-us',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.scss']
})
export class ContactUsComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage
    ) { }

    contact: any = {}

    ngOnInit() {
        this.contentSvr.getContactUs().subscribe(data => {
            this.contact = data.json().data;
        })
    }

    goBack() {
        this.navCtrl.pop();
    }
}