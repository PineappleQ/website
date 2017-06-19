import { AlertController } from 'ionic-angular';
import { PlayService } from './../../service/playService';
import { Component } from '@angular/core';
@Component({
    selector: 'history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
    constructor(
        private playSvr: PlayService,
        private alertCtrl: AlertController
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
            this.playSvr.getPlayTypes().subscribe(
                data => {
                    let result = data.json();
                    if (!result.error) {
                        this.playTypes = result.data;
                        if (this.playTypes && this.playTypes.length) {
                            this.playTypes[0].selected = true;
                            this.selectTab(this.playTypes[0]);
                        }
                    }
                },
                error => {
                    this.playSvr.errorHandler(error, (msg) => {
                        let alert = this.alertCtrl.create({
                            message: msg
                        });
                        alert.present();
                    }, "获取玩法分类失败")
                }
            );
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
        this.playSvr.getPlays(type.id).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.histories = result.data;
                }
                this.loading = false;
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, "获取历史开奖记录失败");
            }
        );
    }
}