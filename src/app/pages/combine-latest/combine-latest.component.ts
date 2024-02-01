import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumberPair } from '../../models/number-pair';
import { NumbersService } from '../../services/numbers.service';
import { CommonModule } from '@angular/common';
import { IsNumberPipe } from '../../pipes/isNumber';

@Component({
  selector: 'app-combine-latest',
  standalone: true,
  imports: [
    CommonModule,
    IsNumberPipe
  ],
  templateUrl: './combine-latest.component.html',
  styleUrl: './combine-latest.component.scss'
})
export class CombineLatestComponent {
  // SUBSCRIPTIONS
  private numbersSubscription?: Subscription;

  // NUMBERS
  numbers?: NumberPair[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.numbersSubscription = this.numbersService.numbers.subscribe(numbers => {
      this.numbers = numbers;
    });

    // this.numbersService.useSwitchMap([1, 3, 5, 78]);
    this.numbersService.useCombineLatest([1, 3, 5, 78]);
  }

  ngOnDestroy(): void {
    this.numbersSubscription!.unsubscribe();
  }
}
