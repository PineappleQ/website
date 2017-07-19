import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService extends ServiceBase {

    /**
     * 获取消息
     */
    getMessage() {
        let url = "/v1/api/user_service_messages";
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