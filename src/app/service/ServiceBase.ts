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

    Get(url) {
        url = this.baseUrl + url;
        let header = new Headers();
        header.append("Content-Type", "application/json");
        if (this.Token) {
            header.append("token", this.Token);
        }
        if (this.CurrentUser) {
            header.append("authorization", this.CurrentUser.authorization);
        }
        return this.http.get(url, { headers: header });
    }

    Post(url, params) {
        url = this.baseUrl + url;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (this.Token) {
            headers.append("token", this.Token);
        }
        if (this.CurrentUser) {
            headers.append("authorization", this.CurrentUser.authorization);
        }
        return this.http.post(url, params, {headers:headers});
    }
}