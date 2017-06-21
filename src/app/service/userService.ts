import { RegisterParams, LoginParams } from './../model/model';
import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
// import * as md5 from "md5";

@Injectable()
export class UserService extends ServiceBase {
    private registerToken;
    getRegisterToken() {
        return this.registerToken;
    }

    setRegistertoken(registerToken) {
        this.registerToken = registerToken;
    }
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
        let token = this.getRegisterToken();
        let headers = new Headers();
        if (token) {
            headers.append("token", token);
        }
        // registerParams.user.password = md5(registerParams.user.password);
        // registerParams.user.passwordConfirmation = md5(registerParams.user.passwordConfirmation);
        return this.Post(url, registerParams, headers);
    }
    /**
     * 用户登录
     * @param loginParams 
     */
    userLogin(loginParams: LoginParams) {
        let url = "/v1/api/sessions";
        return this.Post(url, loginParams);
    }
    /**
     * 获取下注记录
     */
    getUserBets() {
        let url = "/v1/api/user_bets";
        return this.Get(url);
    }
    /**
     * 获取用户信息
     */
    getUserInfo(userId) {
        let url = "/v1/api/users/" + userId;
        return this.Get(url);
    }
}