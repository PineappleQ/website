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
    timer;
    sendMsgContent = "";
    @ViewChild("chatArea") chatArea: ElementRef;

    ionViewWillEnter() {
        this.currentUser = this.customerSvr.CurrentUser;
        this.getMessage();
    }

    getMessage() {
        let that = this;
        let obser = this.customerSvr.getMessage().subscribe(
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
                    this.timer = setTimeout(() => {
                        if (this.timer) {
                            clearTimeout(this.timer);
                        }
                        obser.unsubscribe();
                        this.getMessage();
                    }, 1000);
                } else {
                    clearTimeout(this.timer);
                    this.handleErrorAlert(result.message, "获取消息信息失败");
                }
            },
            error => {
                clearTimeout(this.timer);
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
        clearTimeout(this.timer);
    }

    goBack() {
        clearTimeout(this.timer);
        this.navCtrl.pop();
    }
}