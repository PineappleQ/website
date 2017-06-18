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
        private playSvr: PlayService
    ) { }

    currentRoom: any = {}
    roomMessages: any = [];
    sendMsgContent = "";
    currentUser: User = <any>{};
    private msgTimer;
    private firstLoad = true;
    @ViewChild("chatArea") chatArea: ElementRef;
    ngOnInit() {
        this.currentUser = this.playSvr.CurrentUser;
        let roomId = this.navParams.get("roomId");
        if (!roomId) {
            let toast = this.toastCtrl.create({
                message: '加载聊天室失败'
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
        } else {
            let toast = this.toastCtrl.create({
                message: '加载聊天室失败'
            });
            toast.present();
            this.navCtrl.pop();
            return;
        }
    }

    getRoomInfo() {
        this.playSvr.getPlayRoomMsg(this.currentRoom.id).subscribe(
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
                        this.getRoomInfo()
                    }, 1000);
                }
            },
            error => {
                console.log(error);
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
                    console.log("发送成功");
                }
            },
            error => {
                console.log(error);
            }
        );
        this.sendMsgContent = "";
    }

    trackFn(index, msg?) {
        if (msg) {
            return msg.id;
        }
        return index;
    }

    goBack() {
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
    ngOnDestroy() {
        clearTimeout(this.msgTimer);
    }
}