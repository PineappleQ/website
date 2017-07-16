import { RoomComponent } from './../room/room.component';
import { PlayService } from './../../service/playService';
import { SystemActivityComponent } from './../systemactivity/systemactivity.component';
import { SystemNotifyComponent } from './../systemnotify/systemnotify.component';
import { IntroComponent } from './../intro/intro.component';
import { NavController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
    constructor(
        public navCtrl: NavController,
        private playSvr: PlayService,
        private toastCtrl: ToastController
    ) { }
    introPage: any = IntroComponent;
    rooms = [];
    searchRooms = [];
    keyWord = "";
    timer;
    intervalTimer;

    ionViewWillEnter() {
        this.getRooms();
    }

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
                clearInterval(this.intervalTimer);
                clearTimeout(this.timer);
                let result = data.json();
                if (!result.error) {
                    this.rooms = result.data;
                    this.playSvr.setRoomList(this.rooms);
                    this.getCountDown(this.rooms);
                    this.getNewRoomsInfo();
                }
            },
            error => {
                clearInterval(this.intervalTimer);
                clearTimeout(this.timer);
                this.playSvr.errorHandler(error, (msg) => {
                    let toast = this.toastCtrl.create({
                        message: msg,
                        duration: 3000,
                        position: 'top',
                        cssClass: 'bgred'
                    });
                    toast.present();
                }, "获取房间信息失败，请重试");
            }
        )
    }

    getCountDown(rooms) {
        if (rooms && rooms.length) {
            for (let i = 0; i < rooms.length; i++) {
                let info = rooms[i];
                let currentTime = info["current_time"];
                let playTime = info['current_play']['created_at'];
                let count = new Date(playTime).getTime() - new Date(currentTime).getTime();
                info.countDown = count / 1000;
            }
        }
        this.startTimer()
    }

    trackByFn(index, item) {
        return item.id
    }
    startTimer() {
        let that = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            for (let i = 0; i < that.rooms.length; i++) {
                let room = that.rooms[i];
                if (room.countDown && room.countDown > 0) {
                    room.countDown--;
                }
                that.getCurrentStatus(room);
            }
            that.startTimer();
        }, 1000);
    }

    getCurrentStatus(room) {
        if (room.countDown && room.countDown > 0) {
            room.status = "waiting";
            return;
        } else if ((!room.countDown || room.countDown <= 0) && room.current_play.result == null) {
            room.status = "opening";
        } else {
            room.status = "finish";
        }
    }

    getNewRoomsInfo() {
        let that = this;
        this.intervalTimer = setInterval(() => {
            clearTimeout(that.timer);
            that.getRooms();
        }, 20000);
    }

    getInRomm(room) {
        this.playSvr.createPlayer(room.id).subscribe();
        this.navCtrl.push(RoomComponent, {
            roomId: room.id
        })
    }

    ionViewWillLeave() {
        clearInterval(this.intervalTimer);
        clearTimeout(this.timer);
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