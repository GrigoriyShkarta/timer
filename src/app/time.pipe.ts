import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'countdown',
  pure: true,
})
export class CountdownPipe implements PipeTransform {
  transform(
    milliseconds: number,
    type: 'minutes' | 'seconds'
  ): string {
    const rest = milliseconds % 1000;
    const seconds = (milliseconds - rest) / 1000;
    const minutes = (seconds - (seconds % 60)) / 1000;
    let result = '';
    switch (type) {
      case 'seconds':
        result = `${seconds < 10 ? '0' + seconds : seconds}`;
        break;
      case 'minutes':
        result = `${minutes < 10 ? '0' + minutes : minutes}`;
        break;
    }
    return result;
  }
}
