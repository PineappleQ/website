import { Component, Input } from '@angular/core';
@Component({
    selector: 'trend-common',
    templateUrl: './trendCommon.component.html',
    styleUrls: ['./trendCommon.component.scss']
})
export class TrendCommon{
    @Input() trendData = [];
    items = [
        {
            issue: '2017051',
            result: '6+2+7=15',
            bigOrLittle: '小',
            oddOrEven: '双',
            num:'9105615'
        },
        {
            issue: '2017051',
            result: '6+2+7=15',
            bigOrLittle: '小',
            oddOrEven: '双',
            num:'9105615'
        },
        {
            issue: '2017051',
            result: '6+2+7=15',
            bigOrLittle: '小',
            oddOrEven: '双',
            num:'9105615'
        },
        {
            issue: '2017051',
            result: '6+2+7=15',
            bigOrLittle: '小',
            oddOrEven: '双',
            num:'9105615'
        },
        {
            issue: '2017051',
            result: '6+2+7=15',
            bigOrLittle: '小',
            oddOrEven: '双',
            num:'9105615'
        }
    ]
}