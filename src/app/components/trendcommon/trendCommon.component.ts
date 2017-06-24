import { NavController } from 'ionic-angular';
import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
    selector: 'trend-common',
    templateUrl: './trendCommon.component.html',
    styleUrls: ['./trendCommon.component.scss']
})
export class TrendCommon implements AfterViewInit {
    constructor(
        public navCtrl: NavController
    ) { }
    @Input() trendData = [];
    @ViewChild('scrollHead') scrollHead: ElementRef;
    @ViewChild('scrollBody') scrollBody: ElementRef;
    @ViewChild('scrollBodyHead') scrollBodyHead: ElementRef;

    ngAfterViewInit() {
        if (this.scrollHead) {
            this.scrollHead.nativeElement.addEventListener('scroll', () => {
                this.scrollBody.nativeElement.scrollTop = this.scrollHead.nativeElement.scrollTop;
            }, false);
        }
        if (this.scrollBody) {
            this.scrollBody.nativeElement.addEventListener('scroll', () => {
                this.scrollHead.nativeElement.scrollTop = this.scrollBody.nativeElement.scrollTop;
                this.scrollBodyHead.nativeElement.scrollLeft = this.scrollBody.nativeElement.scrollLeft;
            }, false);
        }
        if (this.scrollBodyHead) {
            this.scrollBodyHead.nativeElement.addEventListener('scroll', () => {
                this.scrollBody.nativeElement.scrollLeft = this.scrollBodyHead.nativeElement.scrollLeft;
            }, false);
        }
    }
}