import { TrendDetailComponent } from './../trendDetail/trendDetail.component';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
@Component({
    selector: 'trend',
    templateUrl: './trend.component.html',
    styleUrls: ['./trend.component.scss']
})
export class TrendComponent {
    constructor(
        public nav: NavController
    ) { }
    trendDetail: any = TrendDetailComponent;
    navDetail(item) {
        this.nav.push(this.trendDetail)
    }
    items = [
        {
            name: '北京28开奖走势图'
        },
        {
            name: '成都28开奖走势图'
        },
        {
            name: '加拿大28开奖走势图'
        },
        {
            name: '重庆28开奖走势图'
        }
    ]
}