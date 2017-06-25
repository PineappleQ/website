import { RegisterParams, LoginParams } from './../model/model';
import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';
import { Headers, ResponseContentType } from '@angular/http';
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
    /**
     * 获取二维码
     */
    getQRCode() {
        let url = "/v1/api/user_qrcode";
        return this.GetImage(url);
    }

    /**
     * 获得用户流水
     */
    getUserJournals(params?: {
        lastTime;
        limit;
    }) {
        let url = "/v1/api/user_journals";
        if (params) {
            url = url + "?";
            if (params.lastTime) {
                url += ("last_time=" + params.lastTime);
            }
            if (params.limit) {
                if (params.lastTime) {
                    url += ("&limit=" + params.limit);
                } else {
                    url += ("limit=" + params.limit);
                }
            }
        }
        return this.Get(url);
    }

    /**
     * 意见反馈
     * @param params 
     */
    submitUserFeedback(params: {
        title;
        content;
    }) {
        let url = "/v1/api/user_feedbacks";
        return this.Post(url, params);
    }

    /**
     * 获得用户返利
     * @param params 
     */
    getUserRebates(params?: {
        limit?;
        lastTime?;
    }) {
        let url = "/v1/api/user_rebates";
        if (params) {
            url = url + "?"
            if (params.limit) {
                url += ("limit=" + params.limit);
            }
            if (params.lastTime) {
                if (params.limit) {
                    url += ("&last_time" + params.lastTime);
                }else {
                    url += ("last_time" + params.lastTime);
                }
            }
        }
        return this.Get(url);
    }
}