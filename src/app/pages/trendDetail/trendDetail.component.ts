import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
    selector: 'trend-detail',
    templateUrl: './trendDetail.component.html',
    styleUrls: ['./trendDetail.component.scss']
})
export class TrendDetailComponent {
    constructor(
        public nav: NavController
    ) { }
    title: string = "XXXX开奖预测";
    back() {
        this.nav.pop();
    }
}