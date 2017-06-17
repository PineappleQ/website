import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
@Component({
    selector: 'chat-item',
    templateUrl: './chatitem.component.html',
    styleUrls: ['./chatitem.component.scss']
})
export class ChatItem implements AfterViewInit {
    @Input() message;
    @Input() right: boolean = false;
    @Output() domLoad: EventEmitter<any> = new EventEmitter<any>();

    ngAfterViewInit() {
        this.domLoad.emit(this.message);
    }
}