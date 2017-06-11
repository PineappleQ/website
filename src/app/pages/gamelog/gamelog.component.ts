import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'game-log',
    templateUrl: './gamelog.component.html',
    styleUrls: ['./gamelog.component.scss']
})
export class GameLogComponent {
    constructor(
        public nav: NavController
    ) { }
    
    goBack() {
        this.nav.pop();
    }
}