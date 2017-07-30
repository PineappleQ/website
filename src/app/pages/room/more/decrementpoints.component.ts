import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'decrement-points',
    template: `
        <div padding>
            <ion-item>
                <ion-label class="placeholder" floating>请输入要下的分数</ion-label>
                <ion-input type="text" [(ngModel)]="points"></ion-input>
            </ion-item>
            <div margin-top text-center>
                <button color="secondary" ion-button (click)="confirm()">确定</button>
                <button color="secondary" ion-button (click)="cancel()">取消</button>
            </div>
        </div>
    `,
    styleUrls: ['./points.component.scss']
})
export class DecrementPointsComponent {
    constructor(
        private viewCtrl: ViewController
    ) { }
    points = "";

    confirm() {
        this.viewCtrl.dismiss(this.points);
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}