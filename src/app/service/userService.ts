import { RegisterParams, LoginParams } from './../model/model';
import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
// import * as md5 from "md5";

@Injectable()
export class UserService extends ServiceBase {
    /**
     * 获取用户注册验证码
     */
    getUserCaptcha() {
        let url = "/v1/api/user_captcha";
        return this.Get(url);
    }
    /**
     * 用户注册
     * @param registerParams 注册参数
     */
    registerUser(registerParams: RegisterParams) {
        let url = "/v1/api/users";
        // registerParams.user.password = md5(registerParams.user.password);
        // registerParams.user.passwordConfirmation = md5(registerParams.user.passwordConfirmation);
        return this.Post(url, registerParams);
    }

    userLogin(loginParams: LoginParams) {
        let url = "/v1/api/sessions";
        return this.Post(url, loginParams);
    }
}