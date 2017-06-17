import { Component, Input } from '@angular/core';
@Component({
    selector: 'history-common',
    templateUrl: './historycommon.component.html',
    styleUrls: ['./historycommon.component.scss']
})
export class HistoryCommon{
    @Input() histories = [];
    @Input() loading:boolean = true;
    aaa = [
             {
                    "id": 1841139,
                    "result": null,
                    "result_1": null,
                    "result_2": null,
                    "result_3": null,
                    "created_at": "2017-06-16T18:10:00.000Z"
             },
             {
                    "id": 1841138,
                    "result": 18,
                    "result_1": 3,
                    "result_2": 7,
                    "result_3": 8,
                    "created_at": "2017-06-16T18:05:00.000Z"
             },
             {
                    "id": 1841137,
                    "result": 5,
                    "result_1": 2,
                    "result_2": 3,
                    "result_3": 0,
                    "created_at": "2017-06-16T18:00:00.000Z"
             },
             {
                    "id": 1841136,
                    "result": 19,
                    "result_1": 5,
                    "result_2": 6,
                    "result_3": 8,
                    "created_at": "2017-06-16T17:55:00.000Z"
             },
             {
                    "id": 1841135,
                    "result": 8,
                    "result_1": 5,
                    "result_2": 0,
                    "result_3": 3,
                    "created_at": "2017-06-16T17:50:00.000Z"
             },
             {
                    "id": 1841134,
                    "result": 17,
                    "result_1": 7,
                    "result_2": 8,
                    "result_3": 2,
                    "created_at": "2017-06-16T17:45:00.000Z"
             },
             {
                    "id": 1841133,
                    "result": 16,
                    "result_1": 5,
                    "result_2": 5,
                    "result_3": 6,
                    "created_at": "2017-06-16T17:40:00.000Z"
             },
             {
                    "id": 1841132,
                    "result": 14,
                    "result_1": 7,
                    "result_2": 0,
                    "result_3": 7,
                    "created_at": "2017-06-16T17:35:00.000Z"
             },
             {
                    "id": 1841131,
                    "result": 13,
                    "result_1": 0,
                    "result_2": 5,
                    "result_3": 8,
                    "created_at": "2017-06-16T17:30:00.000Z"
             },
             {
                    "id": 1841130,
                    "result": 23,
                    "result_1": 9,
                    "result_2": 6,
                    "result_3": 8,
                    "created_at": "2017-06-16T17:25:00.000Z"
             },
             {
                    "id": 1841129,
                    "result": 10,
                    "result_1": 4,
                    "result_2": 0,
                    "result_3": 6,
                    "created_at": "2017-06-16T17:20:00.000Z"
             },
             {
                    "id": 1841128,
                    "result": 13,
                    "result_1": 5,
                    "result_2": 2,
                    "result_3": 6,
                    "created_at": "2017-06-16T17:15:00.000Z"
             },
             {
                    "id": 1841127,
                    "result": 6,
                    "result_1": 0,
                    "result_2": 6,
                    "result_3": 0,
                    "created_at": "2017-06-16T17:10:00.000Z"
             },
             {
                    "id": 1841126,
                    "result": 6,
                    "result_1": 1,
                    "result_2": 1,
                    "result_3": 4,
                    "created_at": "2017-06-16T17:05:00.000Z"
             },
             {
                    "id": 1841125,
                    "result": 18,
                    "result_1": 5,
                    "result_2": 4,
                    "result_3": 9,
                    "created_at": "2017-06-16T17:00:00.000Z"
             },
             {
                    "id": 1841124,
                    "result": 9,
                    "result_1": 3,
                    "result_2": 1,
                    "result_3": 5,
                    "created_at": "2017-06-16T16:55:00.000Z"
             },
             {
                    "id": 1841123,
                    "result": 10,
                    "result_1": 1,
                    "result_2": 5,
                    "result_3": 4,
                    "created_at": "2017-06-16T16:50:00.000Z"
             },
             {
                    "id": 1841122,
                    "result": 16,
                    "result_1": 9,
                    "result_2": 7,
                    "result_3": 0,
                    "created_at": "2017-06-16T16:45:00.000Z"
             },
             {
                    "id": 1841121,
                    "result": 22,
                    "result_1": 4,
                    "result_2": 9,
                    "result_3": 9,
                    "created_at": "2017-06-16T16:40:00.000Z"
             },
             {
                    "id": 1841120,
                    "result": 3,
                    "result_1": 0,
                    "result_2": 1,
                    "result_3": 2,
                    "created_at": "2017-06-16T16:35:00.000Z"
             },
             {
                    "id": 1841119,
                    "result": 5,
                    "result_1": 0,
                    "result_2": 4,
                    "result_3": 1,
                    "created_at": "2017-06-16T16:30:00.000Z"
             },
             {
                    "id": 1841118,
                    "result": 14,
                    "result_1": 0,
                    "result_2": 7,
                    "result_3": 7,
                    "created_at": "2017-06-16T16:25:00.000Z"
             },
             {
                    "id": 1841117,
                    "result": 19,
                    "result_1": 8,
                    "result_2": 3,
                    "result_3": 8,
                    "created_at": "2017-06-16T16:20:00.000Z"
             },
             {
                    "id": 1841116,
                    "result": 17,
                    "result_1": 9,
                    "result_2": 1,
                    "result_3": 7,
                    "created_at": "2017-06-16T16:15:00.000Z"
             },
             {
                    "id": 1841115,
                    "result": 17,
                    "result_1": 7,
                    "result_2": 1,
                    "result_3": 9,
                    "created_at": "2017-06-16T16:10:00.000Z"
             },
             {
                    "id": 1841114,
                    "result": 16,
                    "result_1": 6,
                    "result_2": 1,
                    "result_3": 9,
                    "created_at": "2017-06-16T16:05:00.000Z"
             },
             {
                    "id": 1841113,
                    "result": 16,
                    "result_1": 8,
                    "result_2": 7,
                    "result_3": 1,
                    "created_at": "2017-06-16T16:00:00.000Z"
             }
      ]
}