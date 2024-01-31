import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersService } from '../../services/numbers.service';
import { NumberPair } from '../../models/number-pair';
import { CommonModule } from '@angular/common';
import { IsNumberPipe } from '../../pipes/isNumber';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    IsNumberPipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  // SUBSCRIPTIONS
  private numbersSubscription?: Subscription;

  // NUMBERS
  numbers?: NumberPair[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.numbersSubscription = this.numbersService.numbers.subscribe(numbers => {
      this.numbers = numbers;
    });

    this.numbersService.useFilter([
      1, 2, 57, 58, 103, 104
    ]);
    // this.numbersService.useSwitchMap();
  }

  ngOnDestroy(): void {
    this.numbersSubscription!.unsubscribe();
  }
}
