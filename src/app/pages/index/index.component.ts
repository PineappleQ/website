import { ToastController } from 'ionic-angular';
import { PlayService } from './../../service/playService';
import { UserCenterComponent } from './../userCenter/userCenter.component';
import { TrendComponent } from './../trend/trend.component';
import { HistoryComponent } from './../history/history.component';
import { PurchaseComponent } from './../purchase/purchase.component';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    constructor(
        private playSvr: PlayService,
        private toastCtrl: ToastController
    ) { }
    purchase: any = PurchaseComponent;
    history: any = HistoryComponent;
    trend: any = TrendComponent;
    userCenter: any = UserCenterComponent;
    isMenuOpen: boolean = false;

    ngOnInit() {
        this.playSvr.getPlayTypes().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.playSvr.setPlayTypesList(result.data);
                }
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let toast = this.toastCtrl.create({
                        message: msg,
                        duration: 3000,
                        position: 'top',
                        cssClass: 'bgred'
                    });
                    toast.present();
                }, "获取玩法类型失败")
            }
        );
    }
}