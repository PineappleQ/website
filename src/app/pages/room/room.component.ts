import { DecrementPointsComponent } from './more/decrementpoints.component';
import { IncrementPointsComponent } from './more/incrementpoints.component';
import { User } from './../../model/model';
import { PlayService } from './../../service/playService';
import { NavController, NavParams, AlertController, ToastController, ActionSheetController, PopoverController } from 'ionic-angular';
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
        private playSvr: PlayService,
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController
    ) { }

    currentRoom: any = {}
    roomMessages: any = {};
    sendMsgContent = "";
    currentUser: any = {};
    isShowBetSuccess: boolean = false;
    countTimer;
    resultTimer;
    msgLengthLimit = 100;
    resultInfo: {
        currentPlay;
        lastPlay;
    } = <any>{};
    private msgTimer;
    private firstLoad = true;
    private limit = 100;
    private lastTime: any = 0;
    private obser;
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

    getRoomInfo(lastTime?) {
        this.obser = this.playSvr.getPlayRoomMsg(this.currentRoom.id, 50, lastTime).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    if (this.roomMessages && this.roomMessages.messages) {
                        let msgs = this.roomMessages.messages.concat(result.data.messages);
                        this.roomMessages.messages = [];
                        for (let msg of msgs) {
                            if (!this.roomMessages.messages.length) {
                                this.roomMessages.messages.push(msg);
                            } else {
                                let target = this.roomMessages.messages.find(roomMsg => {
                                    return roomMsg.id == msg.id;
                                });
                                if (!target) {
                                    this.roomMessages.messages.push(msg);
                                }
                            }
                        }
                    } else {
                        this.roomMessages = result.data;
                    }
                    this.lastTime = result.data.last_time;
                    if (this.roomMessages.messages) {
                        // this.roomMessages.messages.sort((a, b) => {
                        //     let dateA = new Date(a.created_at).getTime();
                        //     let dateB = new Date(b.created_at).getTime();
                        //     return dateA - dateB;
                        // });
                        if (this.roomMessages.messages.length > this.msgLengthLimit) {
                            let allLength = this.roomMessages.messages.length
                            let difference = allLength - this.msgLengthLimit;
                            this.roomMessages.messages = this.roomMessages.messages.splice(difference, this.msgLengthLimit);
                        }
                    }
                    if (this.obser) {
                        this.obser.unsubscribe();
                    }
                    this.getRoomInfo(this.lastTime);
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

    actionSheets(event) {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '上分',
                    handler: () => {
                        let popoverIncrement = this.popoverCtrl.create(IncrementPointsComponent);
                        popoverIncrement.present();
                        popoverIncrement.onDidDismiss((data) => {
                            let point = Number(data);
                            if (point || point == 0) {
                                this.playSvr.incrementPoints(this.currentRoom.id, point).subscribe(
                                    data => {
                                        let result = data.json();
                                        if (!result.error) {
                                            this.showToast("上分成功");
                                        }
                                    },
                                    error => {
                                        this.showToast("上分失败，请重试", true);
                                    }
                                );
                            } else {
                                this.showToast("输入的数值有误", true);
                            }
                        })
                    }
                },
                {
                    text: "下分",
                    handler: () => {
                        let popoverDecrement = this.popoverCtrl.create(DecrementPointsComponent);
                        popoverDecrement.present();
                        popoverDecrement.onDidDismiss((data) => {
                            let point = Number(data);
                            if (point || point == 0) {
                                this.playSvr.decrementPoints(this.currentRoom.id, point).subscribe(
                                    data => {
                                        let result = data.json();
                                        if (!result.error) {
                                            this.showToast("下分成功");
                                        } else {
                                            this.showToast(result.message, true);
                                        }
                                    },
                                    errr => {
                                        this.showToast("下分失败，请重试", true);
                                    }
                                )
                            } else {
                                this.showToast("输入的数值有误", true);
                            }
                        })
                    }
                }
            ]
        });
        actionSheet.present();
    }

    showAlert(msg) {
        let alert = this.alertCtrl.create({
            message: msg
        });
        alert.present();
    }

    showToast(msg, isError?: boolean) {
        let msgBody: any = {
            message: msg,
            duration: 3000,
            position: 'top'
        }
        if (isError) {
            msgBody.cssClass = 'bgred'
        }
        let toast = this.toastCtrl.create(msgBody);
        toast.present();
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
        if (this.obser) {
            this.obser.unsubscribe();
        }
        clearTimeout(this.msgTimer);
        clearInterval(this.resultTimer);
        clearTimeout(this.countTimer);
    }
}