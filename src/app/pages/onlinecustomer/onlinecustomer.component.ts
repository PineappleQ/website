import { CustomerService } from './../../service/customerservice';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'online-customer',
    templateUrl: './onlinecustomer.component.html',
    styleUrls: ['./onlinecustomer.component.scss']
})
export class OnlineCustomerComponent {
    constructor(
        private navCtrl: NavController,
        private customerSvr: CustomerService,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) { }

    roomMessages: any = {};
    currentUser: any = {};
    sendMsgContent = "";
    lastTime;
    limit = 50;
    obser;
    @ViewChild("chatArea") chatArea: ElementRef;

    ionViewWillEnter() {
        this.currentUser = this.customerSvr.CurrentUser;
        this.getMessage(this.limit);
    }

    getMessage(limit, lastTime?) {
        let that = this;
        this.obser = this.customerSvr.getMessage(this.limit, this.lastTime).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    this.roomMessages = result.data;
                    this.lastTime = result.data.last_time;
                    if (this.obser) {
                        this.obser.unsubscribe();
                    }
                    this.getMessage(this.limit, this.lastTime);
                } else {
                    if (this.obser) {
                        this.obser.unsubscribe();
                    }
                    this.handleErrorAlert(result.message, "获取消息信息失败");
                }
            },
            error => {
                if (this.obser) {
                    this.obser.unsubscribe();
                }
                this.handleErrorAlert(error, "获取消息信息失败");
            }
        )
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

    sendMsg() {
        if (this.sendMsgContent) {
            let msgObj = {
                message: {
                    content: this.sendMsgContent
                }
            }
            this.customerSvr.sendMessage(msgObj).subscribe(
                data => {
                    let result = data.json();
                    if (!result.error) {
                        this.sendMsgContent = "";
                    } else {
                        this.handleErrorToast(result.message, "发送消息失败");
                    }
                },
                error => {
                    this.handleErrorToast(error, "发送消息失败");
                }
            );
        }
    }

    handleErrorAlert(error, errorContent) {
        let that = this;
        this.customerSvr.errorHandler(error, (msg) => {
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
            })
        }, errorContent);
    }

    handleErrorToast(error, errorContent) {
        this.customerSvr.errorHandler(error, (msg) => {
            let toast = this.toastCtrl.create({
                message: msg,
                duration: 3000,
                position: 'top',
                cssClass: 'bgred'
            });
            toast.present();
        }, errorContent);
    }

    trackFn(index, msg?) {
        if (msg) {
            return msg.id;
        }
        return index;
    }

    ionViewWillLeave() {
        if (this.obser) {
            this.obser.unsubscribe();
        }
        if (this.obser) {
            this.obser.unsubscribe();
        }
    }

    goBack() {
        if (this.obser) {
            this.obser.unsubscribe();
        }
        this.navCtrl.pop();
    }
}