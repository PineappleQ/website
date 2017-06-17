import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';

@Injectable()
export class ContentManage extends ServiceBase {

    /**
     * 获取系统公告
     */
    getSystemNotify() {
        let url = "/v1/api/system_notifications";
        return this.Get(url);
    }
    /**
     * 获取系统活动内容
     */
    getSystemActivity() {
        let url = "/v1/api/activity";
        return this.Get(url);
    }
    /**
     * 获取用户/游戏协议
     */
    getAgreement(){
        let url = "/v1/api/agreement";
        return this.Get(url);
    }
    /**
     * 获取联系我们
     */
    getContactUs(){
        let url = "/v1/api/contact_us";
        return this.Get(url);
    }
    /**
     * 获取关于我们
     */
    getAboutUs(){
        let url = "/v1/api/about_us";
        return this.Get(url);
    }
}