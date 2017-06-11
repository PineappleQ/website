import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'feed-back',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedBackComponent {
    constructor(
        public nav: NavController
    ) { }
    goBack() {
        this.nav.pop();
    }
}