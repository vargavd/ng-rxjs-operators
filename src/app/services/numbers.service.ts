import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, concatMap, delay, from, interval, map, of, switchMap, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  originalNumbers = new BehaviorSubject<number[]>([]);
  convertedNumbers = new BehaviorSubject<number[]>([]);

  constructor() { }

  reset() {
    this.originalNumbers.next([]);
    this.convertedNumbers.next([]);
  }

  useMap(numbers: number[]) {
    from(numbers).pipe(
      concatMap(number =>
        of(number).pipe(
          delay(1000),
          tap((originalNumber: number) => {
            this.originalNumbers.next([...this.originalNumbers.getValue(), originalNumber]);
          }),
          delay(1000), // Add a delay of 1 second here
          map((originalNumber: number) => originalNumber * 2),
          tap((convertedNumber: number) => {
            this.convertedNumbers.next([...this.convertedNumbers.getValue(), convertedNumber]);
          })
        )
      )
    ).subscribe();
  }

  useSwitchMap() {
    // very good video: https://www.youtube.com/watch?v=6lKoLwGlglE

    // interval(1000).pipe(
    //   switchMap(() => from([1, 2, 3, 78]).pipe(map(number => number * 2)))
    // ).subscribe(number => console.log(number));

    // interval(1000).pipe(
    //   switchMap((elapsedSeconds) => from(
    //     Array.from({ length: elapsedSeconds }, (_, index) => index)
    //   ).pipe(map(number => number * 2))
    //   )
    // ).subscribe(number => console.log(number));
  }

  useMergeMap() {
    // video: https://youtu.be/b59tcUwfpWU?si=Fs_nEaT1aaoOOvkT
  }

  useConcatMap() {
    // video: https://youtu.be/Byttv3YpjQk?t=788

    // interval(1000).pipe(
    //   concatMap((elapsedSeconds) => of(elapsedSeconds).pipe(
    //     tap(elapsedSeconds => console.log(`Outer elapsed seconds: ${elapsedSeconds}`)),
    //     switchMap((elapsedSeconds) => from(
    //       Array.from({ length: elapsedSeconds }, (_, index) => index)
    //     ))
    //   ).pipe(map(number => number * 2))
    //   )
    // ).subscribe(number => console.log(number));
  }
}
