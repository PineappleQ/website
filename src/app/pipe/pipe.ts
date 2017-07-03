
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private domSanitizer: DomSanitizer) { }
    transform(url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Pipe({
    name: 'formatTime'
})
export class FormatTime implements PipeTransform {
    transform(time) {
        let result = "0";
        if (time) {
            let min = 0;
            let sec = 0;
            min = Math.floor(time / 60);
            sec = time - 60 * min;
            result = min + "分" + sec + "秒";
        }
        return result;
    }
}