import { ContentManage } from './../../service/contentmanage';
import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'about-us',
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.scss']
})
export class AboutUsComponent implements OnInit {

    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage
    ) { }

    about: any = {}

    ngOnInit() {
        this.contentSvr.getAboutUs().subscribe(data => {
            this.about = data.json().data;
        })
    }
    goBack() {
        this.navCtrl.pop();
    }
}