import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'cooperation',
    templateUrl: './cooperation.component.html',
    styleUrls: ['./cooperation.component.scss']
})
export class CooperationComponent {
    constructor(
        public nav: NavController
    ) { }

    goBack(){
        this.nav.pop();
    }
}