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
        private playSvr: PlayService
    ) { }
    purchase: any = PurchaseComponent;
    history: any = HistoryComponent;
    trend: any = TrendComponent;
    userCenter: any = UserCenterComponent;
    isMenuOpen: boolean = false;

    ngOnInit() {
        this.playSvr.getPlayTypes().subscribe(data => {
            console.log(data.json())
            this.playSvr.setPlayTypesList(data.json().data);
        });
    }
}