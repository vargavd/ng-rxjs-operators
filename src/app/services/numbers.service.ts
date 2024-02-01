import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, combineLatest, concatMap, delay, filter, from, interval, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { NumberPair } from '../models/number-pair';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  numbers = new BehaviorSubject<NumberPair[]>([]);
  numberSubscription?: Subscription;

  constructor() { }

  reset() {
    this.numbers.next([]);
    this.numberSubscription?.unsubscribe();
  }

  useMap(numbers: number[]) {
    this.reset();

    this.numberSubscription = from(numbers).pipe(
      concatMap(number =>
        of(number).pipe(
          delay(1000),
          tap((originalNumber: number) => {
            this.numbers.next([...this.numbers.getValue(), {
              leftNumber: originalNumber
            }]);
          }),
          delay(1000),
          map((originalNumber: number) => originalNumber * 2),
          tap((convertedNumber: number) => {
            let numbers = this.numbers.getValue().slice();
            numbers[numbers.length - 1].rightNumber = convertedNumber;

            this.numbers.next(numbers);
          })
        )
      )
    ).subscribe();
  }

  useFilter(numbers: number[]) {
    this.reset();

    this.numberSubscription = from(numbers).pipe(
      concatMap(number =>
        of(number).pipe(
          delay(1000),
          tap((number: number) => {
            this.numbers.next([...this.numbers.getValue(), {
              leftNumber: number
            }]);
          }),
          delay(1000),
          filter((number: number) => {
            if (number % 2 === 0) {
              return true;
            }

            let numbers = this.numbers.getValue().slice();
            numbers[numbers.length - 1].rightNumber = 'BLOCKED';

            this.numbers.next(numbers);

            return false;
          }),
          tap((number: number) => {
            let numbers = this.numbers.getValue().slice();
            numbers[numbers.length - 1].rightNumber = number;

            this.numbers.next(numbers);
          })
        )
      )
    ).subscribe();
  }

  useTap(numbers: number[]) {
    this.reset();

    this.numberSubscription = from(numbers).pipe(
      concatMap(number =>
        of(number).pipe(
          delay(1000),
          tap((number: number) => {
            this.numbers.next([...this.numbers.getValue(), {
              leftNumber: number
            }]);
          }),
          delay(1000),
          tap(number => console.log(number)),
          tap((number: number) => {
            let numbers = this.numbers.getValue().slice();
            numbers[numbers.length - 1].rightNumber = number;

            this.numbers.next(numbers);
          })
        )
      )
    ).subscribe();
  }

  useSwitchMap(numbers: number[]) {
    // very good video: https://www.youtube.com/watch?v=6lKoLwGlglE

    this.reset();

    this.numberSubscription = from(numbers).pipe(
      tap((number: number) => {
        this.numbers.next([...this.numbers.getValue(), {
          leftNumber: number
        }]);
      }),
      switchMap((number: number) => from([`${number}a`, `${number}b`, `${number}c`]).pipe(
        concatMap((number: string) =>
          of(number).pipe(delay(500))
        )
      )),
      tap((number: string) => {
        let numbers = this.numbers.getValue().slice();

        if (numbers[numbers.length - 1].rightNumber) {
          numbers.push({
            rightNumber: number
          });
        } else {
          numbers[numbers.length - 1].rightNumber = number;
        }

        this.numbers.next(numbers);
      })
    ).subscribe();

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

  useConcatMap(numbers: number[]) {
    // video: https://youtu.be/Byttv3YpjQk?t=788

    this.reset();

    this.numberSubscription = from(numbers).pipe(
      concatMap(number =>
        of(number).pipe(
          delay(1000),
          tap((number: number) => {
            this.numbers.next([...this.numbers.getValue(), {
              leftNumber: number
            }]);
          }),
          delay(1000),
          concatMap((number: number) => from([`${number}a`, `${number}b`, `${number}c`])),
          tap((number: string) => {
            let numbers = this.numbers.getValue().slice();

            console.log(number);

            if (numbers[numbers.length - 1].rightNumber) {
              numbers.push({
                rightNumber: number
              });
            } else {
              numbers[numbers.length - 1].rightNumber = number;
            }

            this.numbers.next(numbers);
          })
        )
      )
    ).subscribe();

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

  useCombineLatest(numbers: number[]) {
    this.reset();

    combineLatest([
      interval(1000).pipe(take(5)),
      from(numbers).pipe(
        concatMap(number =>
          of(number).pipe(
            delay(500)
          )
        )
      )
    ]).subscribe(([seconds, number]) => {
      this.numbers.next([...this.numbers.getValue(), {
        leftNumber: `${seconds}s`,
        rightNumber: number
      }])
    });
  }
}
