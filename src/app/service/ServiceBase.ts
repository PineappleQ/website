import { User } from './../model/model';
import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http'

@Injectable()
export class ServiceBase {

    constructor(
        private http: Http,
        private jsonp: Jsonp
    ) { }

    baseUrl = "http://dd.cdjump.com";

    Token: string = "";
    get CurrentUser(): User {
        let userStr = sessionStorage.getItem("user");
        return JSON.parse(userStr);
    }

    set CurrentUser(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    Get(url, headers?: Headers) {
        url = this.baseUrl + url;
        let header = null;
        if (headers) {
            header = headers;
        } else {
            header = new Headers();
        }
        header.append("Content-Type", "application/json");
        header.append('access-control-expose-headers', 'x-total-count');
        if (this.Token) {
            header.append("token", this.Token);
        }
        if (this.CurrentUser) {
            header.append("authorization", this.CurrentUser.authorization);
        }
        return this.http.get(url, { headers: header, withCredentials: true });
    }

    Post(url, params, headers?: Headers) {
        url = this.baseUrl + url;
        let header = null;
        if (headers) {
            header = headers;
        } else {
            header = new Headers();
        }
        header.append("Content-Type", "application/json");
        if (this.Token) {
            header.append("token", this.Token);
        }
        if (this.CurrentUser) {
            header.append("authorization", this.CurrentUser.authorization);
        }
        return this.http.post(url, params, { headers: header, withCredentials: true });
    }

    errorHandler(error, cb, commonMsg) {
        try {
            let errorResult = error.json();
            let msg = errorResult.message ? errorResult.message : commonMsg;
            cb && cb(msg);
        } catch (e) {
            cb && cb("服务器错误");
        }
    }
}