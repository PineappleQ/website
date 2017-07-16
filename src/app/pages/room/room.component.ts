import { User } from './../../model/model';
import { PlayService } from './../../service/playService';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private playSvr: PlayService
    ) { }

    currentRoom: any = {}
    roomMessages: any = {};
    sendMsgContent = "";
    currentUser: any = {};
    isShowBetSuccess: boolean = false;
    countTimer;
    resultTimer;
    resultInfo: {
        currentPlay;
        lastPlay;
    } = <any>{};
    private msgTimer;
    private firstLoad = true;
    private limit = 100;
    private lastTime: any = 0;
    @ViewChild("chatArea") chatArea: ElementRef;
    @ViewChild("betSuccess") betSuccess: ElementRef;
    @ViewChild("betFailed") betFailed: ElementRef;
    async ngOnInit() {
        this.currentUser = this.playSvr.CurrentUser;
        let roomId = this.navParams.get("roomId");
        if (!roomId) {
            let toast = this.toastCtrl.create({
                message: '加载聊天室失败',
                duration: 3000,
                position: 'top',
                cssClass: 'bgred'
            });
            toast.present();
            this.navCtrl.pop();
            return;
        }
        let roomList = this.playSvr.getRoomList();
        let room = roomList.find(r => r.id == roomId);
        if (room) {
            this.currentRoom = room;
            this.getRoomInfo();
            this.getResultDetail();
        } else {
            let toast = this.toastCtrl.create({
                message: '加载聊天室失败',
                duration: 3000,
                position: 'top',
                cssClass: 'bgred'
            });
            toast.present();
            this.navCtrl.pop();
            return;
        }
    }

    getRoomInfo() {
        let obser = this.playSvr.getPlayRoomMsg(this.currentRoom.id, 50).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.roomMessages = result.data;
                    if (this.roomMessages.messages) {
                        this.roomMessages.messages.sort((a, b) => {
                            let dateA = new Date(a.created_at).getTime();
                            let dateB = new Date(b.created_at).getTime();
                            return dateA - dateB;
                        });
                    }
                    this.msgTimer = setTimeout(() => {
                        if (this.msgTimer) {
                            clearTimeout(this.msgTimer);
                        }
                        obser.unsubscribe();
                        this.getRoomInfo();
                    }, 1000);
                }
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let that = this;
                    let alert = this.alertCtrl.create({
                        message: msg,
                        buttons: [
                            {
                                text: '确定',
                                role: 'cancel',
                                handler: () => {
                                    that.goBack();
                                }
                            }
                        ]
                    });
                    alert.present();
                }, "获取聊天室消息失败");
            }
        );
    }

    sendMsg() {
        let params = {
            roomId: this.currentRoom.id,
            message: {
                content: this.sendMsgContent
            }
        }
        this.playSvr.sendRoomMsg(params).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    if (result.data.bets && result.data.bets.length) {
                        this.showBetResult(true);
                    }
                } else {
                    this.showBetResult(false);
                }
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let toast = this.toastCtrl.create({
                        message: msg,
                        duration: 3000,
                        position: 'top',
                        cssClass: 'bgred'
                    });
                    toast.present();
                    this.showBetResult(false);
                }, "发送消息错误");
            }
        );
        this.sendMsgContent = "";
    }

    showBetResult(isSuccess: boolean) {
        let success = this.betSuccess.nativeElement;
        let failed = this.betFailed.nativeElement;
        if (isSuccess) {
            success.style.display = "block";
            failed.style.display = "none";
        } else {
            success.style.display = "none";
            failed.style.display = "block";
        }
        setTimeout(() => {
            success.style.display = "none";
            failed.style.display = "none";
        }, 1500);
    }

    trackFn(index, msg?) {
        if (msg) {
            return msg.id;
        }
        return index;
    }

    goBack() {
        this.playSvr.deletePlayer(this.currentRoom.id).subscribe();
        clearTimeout(this.msgTimer);
        this.navCtrl.pop();
    }
    chatDomLoad($event) {
        let length = this.roomMessages.messages.length;
        if ($event.id != this.roomMessages.messages[length - 1].id) {
            return;
        }
        if (this.chatArea && this.chatArea.nativeElement) {
            this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
        }
    }

    getResultDetail() {
        this.playSvr.getPlayRooms().subscribe(
            data => {
                let result = data.json()
                if (!result.error) {
                    let roomData = result.data;
                    let info = roomData.find(r => {
                        return r.id == this.currentRoom.id;
                    });
                    if (info) {
                        this.resultInfo.currentPlay = info['current_play'];
                        this.resultInfo.lastPlay = info['last_finished_play'];
                        let currentTime = info["current_time"];
                        let playTime = info['current_play']['created_at'];
                        let count = new Date(playTime).getTime() - new Date(currentTime).getTime();
                        this.resultInfo.currentPlay.countDown = count / 1000;
                        this.getCurrentStatus(this.resultInfo.currentPlay);
                    }
                }
            },
            error => {
                this.playSvr.errorHandler(error, (msg) => {
                    let toast = this.toastCtrl.create({
                        message: msg,
                        duration: 3000,
                        position: 'top',
                        cssClass: 'bgred'
                    });
                    toast.present();
                }, "获取开奖信息失败");
            }
        );
    }

    getCurrentStatus(currentPlay) {
        clearInterval(this.resultTimer);
        if (currentPlay.countDown && currentPlay.countDown > 0) {
            currentPlay.status = "waiting";
            this.counting();
            return;
        } else if ((!currentPlay.countDown || currentPlay.countDown <= 0) && currentPlay.result == null) {
            currentPlay.status = "opening";
        } else {
            currentPlay.status = "finish";
        }

        this.resultTimer = setInterval(() => {
            this.getResultDetail();
        }, 20000);
    }

    counting() {
        if (this.countTimer) {
            clearTimeout(this.countTimer);
        }
        this.countTimer = setTimeout(() => {
            if (this.resultInfo.currentPlay.countDown && this.resultInfo.currentPlay.countDown > 0) {
                this.resultInfo.currentPlay.countDown--;
                this.counting();
            } else {
                this.getResultDetail();
                clearTimeout(this.countTimer);
            }
        }, 1000);
    }

    ngOnDestroy() {
        clearTimeout(this.msgTimer);
        clearInterval(this.resultTimer);
        clearTimeout(this.countTimer);
    }
}