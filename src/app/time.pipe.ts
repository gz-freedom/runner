import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(sec: number): string {
    let str = "";
    let h = parseInt(sec / 3600 + "");
    if(h > 0) {
      str += (h + "小时");
      sec %= 3600;
    }
    let m = parseInt(sec / 60 + "");
    if(m > 0) {
      str += (m + "分钟");
      sec %= 60;
    }
    if(sec > 0) {
      str += (sec + "秒");
    }
    return str;
  }

}
