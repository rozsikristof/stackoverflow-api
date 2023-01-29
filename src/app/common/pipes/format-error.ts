import { Pipe, PipeTransform } from '@angular/core';

const TIME_START_OFFSET = 3;
const SEC_TO_HOUR = 3600;
const SEC_TO_MINUTE = 60;

@Pipe({
  name: 'formatError',
  standalone: true
})
export class FormatError implements PipeTransform {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, ...args: unknown[]): unknown {
    const timerStartIndex = value.indexOf('in ') + TIME_START_OFFSET;
    const timerEndIndex = value.indexOf(' seconds');
    const time = +value.substring(timerStartIndex, timerEndIndex);

    const hour = this.convertToTwoDigits(Math.floor(time / SEC_TO_HOUR).toString());
    const minute = this.convertToTwoDigits(Math.floor(time % SEC_TO_HOUR / SEC_TO_MINUTE).toString());
    const second = this.convertToTwoDigits((time % SEC_TO_MINUTE).toString());

    return `${value.substring(0, timerStartIndex)} ${hour}:${minute}:${second}`;
  }

  private convertToTwoDigits(time: string): string {
    if (time.length === 1) {
      return `0${time}`;
    }

    return time;
  }
}
