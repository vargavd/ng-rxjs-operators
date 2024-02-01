import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumberPair } from '../../models/number-pair';
import { NumbersService } from '../../services/numbers.service';
import { CommonModule } from '@angular/common';
import { IsNumberPipe } from '../../pipes/isNumber';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [
    CommonModule,
    IsNumberPipe
  ],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss'
})
export class TapComponent {
  // SUBSCRIPTIONS
  private numbersSubscription?: Subscription;

  // NUMBERS
  numbers?: NumberPair[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.numbersSubscription = this.numbersService.numbers.subscribe(numbers => {
      this.numbers = numbers;
    });

    this.numbersService.useTap([1, 3, 5, 78]);
    // this.numbersService.useSwitchMap();
  }

  ngOnDestroy(): void {
    this.numbersSubscription!.unsubscribe();
  }
}
