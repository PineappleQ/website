import { IndexComponent } from './../index/index.component';
import { UserService } from './../../service/userService';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { LoginParams, RegisterParams } from './../../model/model';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        public navCtrl: NavController,
        private userSvr: UserService,
        public alertCtrl: AlertController,
        private loadingCtrl: LoadingController
    ) { }
    title = "用户登录";
    isLogin: boolean = true;
    captcha: any = {}
    loginParams: LoginParams = {
        user: {
            account: "",
            password: ""
        }
    }
    registerParams: RegisterParams = {
        user: {
            name: "",
            account: "",
            password: "",
            password_confirmation: ""
        },
        captcha: "",
    }

    @ViewChild("captchaContainer") captchaContainer: ElementRef;

    onLoginSubmit() {
        let loader = this.loadingCtrl.create({
            content: '正在登录'
        });
        loader.present();
        this.userSvr.userLogin(this.loginParams).subscribe(
            data => {
                loader.dismiss();
                let result = data.json();
                if (!result.error) {
                    this.userSvr.CurrentUser = result.data;
                    this.loginSuccess();
                }
            },
            error => {
                loader.dismiss();
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg,
                    });
                    alert.present();
                }, "登录失败，请重试");
            }
        );
    }

    onRegisterSubmit() {
        this.userSvr.registerUser(this.registerParams).subscribe(
            data => {
                let result = data.json();
                if (!result.error) {
                    let that = this;
                    this.userSvr.CurrentUser = result.data;
                    let alert = this.alertCtrl.create({
                        message: "注册成功, 是否现在登录?",
                        buttons: [
                            {
                                text: '取消',
                                role: 'cancel',
                                handler: () => {

                                }
                            },
                            {
                                text: '确定',
                                handler: () => {
                                    that.backToLogin();
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            },
            error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg,
                    });
                    alert.present();
                }, "注册失败，请重试");
            }
        )
    }

    goRegister() {
        this.initRegisterParam();
        this.getCaptcha();
        this.isLogin = false;
        this.title = "用户注册";
    }

    backToLogin() {
        this.isLogin = true;
        this.initLoginParam();
        this.title = "用户登录";
    }
    /**
     * 获取验证码
     */
    getCaptcha() {
        this.userSvr.getUserCaptcha().subscribe(
            data => {
                this.captchaContainer.nativeElement.innerHTML = (<any>data)._body;
            }, error => {
                this.userSvr.errorHandler(error, (msg) => {
                    let alert = this.alertCtrl.create({
                        message: msg,
                    });
                    alert.present();
                }, "获取验证码失败");
            });
    }

    loginSuccess() {
        this.navCtrl.setRoot(IndexComponent);
    }

    initRegisterParam() {
        this.registerParams = {
            user: {
                name: "",
                account: "",
                password: "",
                password_confirmation: ""
            },
            captcha: "",
        }
    }

    initLoginParam() {
        this.loginParams = {
            user: {
                account: "",
                password: ""
            }
        }
    }
}