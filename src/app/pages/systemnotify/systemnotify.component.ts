import { NavController } from 'ionic-angular';
import { ContentManage } from './../../service/contentmanage';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'system-notify',
    templateUrl: './systemnotify.component.html',
    styleUrls: ['./systemnotify.component.scss']
})
export class SystemNotifyComponent implements OnInit{
    constructor(
        private contentSvr: ContentManage,
        public navCtrl: NavController
    ) { }
    header: string = "";
    notifies = [];

    ngOnInit() {
        this.getNotifies();
    }
    /**
     * 获取系统公告
     */
    getNotifies() {
        this.contentSvr.getSystemNotify().subscribe((data) => {
            let info = data.json().data;
            this.notifies.push(info);
        });
    }

    back() {
        this.navCtrl.pop();
    }
}