import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, interval, NEVER, Observable, Subject, Subscription, timer } from 'rxjs';
import { last, map, mergeMap, startWith, switchMap, tap, timeout, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  source$ = interval(1000);
  pauser$ = new Subject();
  pauserIndicator$ = this.pauser$.pipe(
    startWith(true),
    map(val => val ?? false)
    );

  lastValue = 0;
  pausable$ = this.pauser$.pipe(
    withLatestFrom(this.source$),
    switchMap(([paused, seconds]) => {
      if (!paused) {
        console.log();
        this.lastValue = seconds;
      }
    return paused ? NEVER : this.source$.pipe(startWith(this.lastValue));
  }));

}
