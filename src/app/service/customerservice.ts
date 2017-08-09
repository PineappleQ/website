import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService extends ServiceBase {

    /**
     * 获取消息
     */
    getMessage(limit, lastTime?) {
        let params = [];
        if (limit) {
            let limitArr = "limit=" + limit;
            params.push(limitArr);
        }
        if (lastTime) {
            let timeArr = "last_time=" + lastTime;
            params.push(timeArr);
        }
        let queryParams = params.join("&");
        let url = "/v1/api/user_service_messages?" + queryParams;
        return this.Get(url);
    }

    /**
     * 发送消息
     * @param params 
     */
    sendMessage(params: {
        message: {
            content: string;
        };
    }) {
        let url = "/v1/api/user_service_messages";
        return this.Post(url, params);
    }

}