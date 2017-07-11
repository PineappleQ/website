import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { UserService } from "app/service/userService";
@Component({
    selector: 'share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss']
})
export class ShareComponent {
    constructor(
        public nav: NavController,
        private userSvr: UserService,
        private alertCtrl: AlertController
    ) { }

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
}