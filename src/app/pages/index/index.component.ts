import { CanadaComponent } from './../Canada/Canada.component';
import { DenmarkComponent } from './../Denmark/Denmark.component';
import { LuckyComponent } from './../lucky/lucky.component';
import { Component } from '@angular/core';
@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    lucky: any = LuckyComponent;
    Denmark: any = DenmarkComponent;
    Canada:any = CanadaComponent;
}