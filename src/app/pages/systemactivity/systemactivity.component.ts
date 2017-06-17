import { ContentManage } from './../../service/contentmanage';
import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'system-activity',
    templateUrl: './systemactivity.component.html',
    styleUrls: ['./systemactivity.component.scss']
})
export class SystemActivityComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private contentSvr: ContentManage
    ) { }

    activities = [];

    ngOnInit() {
        this.contentSvr.getSystemActivity().subscribe(data => {
            this.activities.push(data.json().data);
        });
    }
    
    back() {
        this.navCtrl.pop();
    }
}