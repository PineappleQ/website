import { PlayService } from './../../service/playService';
import { Component } from '@angular/core';
@Component({
    selector: 'history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
    constructor(
        private playSvr: PlayService
    ) { }

    playTypes = [];
    histories = [];
    loading: boolean = true;

    ionViewWillEnter() {
        this.playTypes = this.playSvr.getPlayTypesList();
        if (this.playTypes && this.playTypes.length) {
            this.playTypes[0].selected = true;
            this.selectTab(this.playTypes[0]);
        } else {
            this.playSvr.getPlayTypes().subscribe(data => {
                this.playTypes = data.json().data;
                if (this.playTypes && this.playTypes.length) {
                    this.playTypes[0].selected = true;
                    this.selectTab(this.playTypes[0]);
                }
            });
        }
    }

    selectTab(type) {
        this.loading = true;
        for (let py of this.playTypes) {
            if (py.id != type.id) {
                delete py.selected;
            }
        }
        type.selected = true;
        let today = new Date().getTime() + "";
        this.playSvr.getPlays(type.id).subscribe(data => {
            this.histories = data.json().data;
            this.loading = false;
        });
    }
}