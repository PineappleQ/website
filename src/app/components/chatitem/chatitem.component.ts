import { UserService } from './../../service/userService';
import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
@Component({
    selector: 'chat-item',
    templateUrl: './chatitem.component.html',
    styleUrls: ['./chatitem.component.scss']
})
export class ChatItem implements AfterViewInit {
    constructor(
        private userSvr: UserService
    ) { }
    @Input() message;
    @Input() right: boolean = false;
    @Output() domLoad: EventEmitter<any> = new EventEmitter<any>();

    baseUrl = this.userSvr.baseUrl;

    ngAfterViewInit() {
        this.domLoad.emit(this.message);
    }
}