import { UserService } from './../../service/userService';
import { MyPayBackComponent } from './../mypayback/mypayback.component';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'pay-back',
    templateUrl: './payback.component.html',
    styleUrls: ['./payback.component.scss']
})
export class PayBackComponent {
    constructor(
        public nav: NavController,
        private userSvr: UserService,
        private alertCtrl: AlertController
    ) { }
    myPaybackPage: any = MyPayBackComponent;

    QRCodeSrc = "";
    blobFile;
    goBack() {
        this.nav.pop();
    }

    ionViewWillEnter() {
        this.getQrCode();
    }

    getQrCode() {
        this.userSvr.getQRCode().subscribe(
            data => {
                let result = data.blob();
                this.blobFile = new Blob([result], { type: 'image/png' });
                this.QRCodeSrc = URL.createObjectURL(this.blobFile);
            },
            error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg
                    });
                    alert.present();
                }, '获取二维码失败');
            }
        )
    }

    saveImg() {
        if (this.blobFile) {
            let a = document.createElement("a");
            a.href = this.QRCodeSrc;
            a.download = "qrcode.png";
            a.click();
        }
    }

    myPayBack() {
        this.nav.push(this.myPaybackPage);
    }
}