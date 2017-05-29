import { TabBComponent } from './../tabB/tabB.component';
import { TabAComponent } from './../tabA/taba.component';
import { Component } from '@angular/core';
@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    taba: any = TabAComponent;
    tabb: any = TabBComponent;
}