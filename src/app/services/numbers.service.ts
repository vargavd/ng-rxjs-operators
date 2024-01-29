import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, concatMap, delay, from, map, of, tap } from 'rxjs';

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
    return from(numbers).pipe(
      concatMap(number => of(number).pipe(delay(1000))),
      tap((number: number) => {
        this.originalNumbers.next([...this.originalNumbers.getValue(), number]);
      }),
      concatMap(number => of(number).pipe(delay(1000))),
      map((number: number) => number * 2),
      tap((number: number) => {
        this.convertedNumbers.next([...this.convertedNumbers.getValue(), number]);
      })
    );
  }
}
