import { Component } from '@angular/core';
import { BehaviorSubject, interval, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { decisecondMilliseconds } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pauser$ = new BehaviorSubject(true);

  lastValue = 0;

  constructor() {
    this.pauser$.pipe(
      switchMap((paused) => {
        if (paused) {
          return of(this.lastValue);
        }
        return interval(decisecondMilliseconds).pipe(map(() => this.lastValue += decisecondMilliseconds));
      })
    ).subscribe();
  }

}
