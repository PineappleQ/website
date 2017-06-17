import { RoomComponent } from './../room/room.component';
import { PlayService } from './../../service/playService';
import { SystemActivityComponent } from './../systemactivity/systemactivity.component';
import { SystemNotifyComponent } from './../systemnotify/systemnotify.component';
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
        public navCtrl: NavController,
        private playSvr: PlayService
    ) {
        this.getRooms();
    }
    introPage: any = IntroComponent;
    rooms = [];
    searchRooms = [];
    keyWord = "";
    goIntro() {
        this.navCtrl.push(this.introPage);
    }

    systemNotify() {
        this.navCtrl.push(SystemNotifyComponent);
    }

    systemActivity() {
        this.navCtrl.push(SystemActivityComponent);
    }

    getRooms() {
        this.playSvr.getPlayRooms().subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.rooms = result.data;
                    this.playSvr.setRoomList(this.rooms);
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    getInRomm(room) {
        this.navCtrl.push(RoomComponent, {
            roomId: room.id
        })
    }

    // onInput($event) {
    //     if (!this.keyWord) {
    //         this.searchRooms = [];
    //         return;
    //     }
    //     this.searchRooms = this.rooms.filter(r => {
    //         return r.name.indexOf(this.keyWord) > -1;
    //     });
    // }

    // onClear($event) {
    //     this.searchRooms = [];
    // }

    // trackFn(index, room?) {
    //     if (room) {
    //         return room.id;
    //     }
    //     return index;
    // }
}