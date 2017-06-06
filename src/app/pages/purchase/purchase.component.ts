import { IntroComponent } from './../intro/intro.component';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
    constructor(
        public navCtrl: NavController
    ) { }
    introPage: any = IntroComponent;

    goIntro() {
        this.navCtrl.push(this.introPage);
    }
    
    items = [
        {
            name: '重庆28（3倍专场）',
            describe: '5分钟一场',
            pic: './assets/images/default.jpeg'
        },
        {
            name: '重庆28（5倍专场）',
            describe: '10分钟一场',
            pic: './assets/images/default.jpeg'
        },
        {
            name: '加拿大28（3倍专场）',
            describe: '5分钟一场',
            pic: './assets/images/default.jpeg'
        },
        {
            name: '加拿大28（5倍专场）',
            describe: '5分钟一场',
            pic: './assets/images/default.jpeg'
        },
        {
            name: '北京28（5倍专场）',
            describe: '10分钟一场',
            pic: './assets/images/default.jpeg'
        }
    ]
}