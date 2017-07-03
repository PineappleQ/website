import { User } from './../model/model';
import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, ResponseContentType } from '@angular/http'

@Injectable()
export class ServiceBase {

    constructor(
        private http: Http,
        private jsonp: Jsonp
    ) { }

    isHttps() {
        let href = window.location.href;
        if (href.indexOf("https") > -1) {
            return true;
        }
        return false;
    }

    get baseUrl() {
        let isHttps = this.isHttps();
        if (isHttps) {
            return "https://dd.cdjump.com";
        }
        return "http://dd.cdjump.com";
    }

    Token: string = "";
    get CurrentUser(): User {
        let user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    set CurrentUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
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
        if (this.Token) {
            header.append("token", this.Token);
        }
        if (this.CurrentUser) {
            header.append("authorization", this.CurrentUser.authorization);
        }
        return this.http.get(url, { headers: header, withCredentials: true });
    }

    GetImage(url) {
        url = this.baseUrl + url;
        let headers = new Headers();
        headers.append("Content-Type", "image/png");
        if (this.Token) {
            headers.append("token", this.Token);
        }
        if (this.CurrentUser) {
            headers.append("authorization", this.CurrentUser.authorization);
        }
        return this.http.get(url, { headers: headers, withCredentials: true, responseType: ResponseContentType.Blob });
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