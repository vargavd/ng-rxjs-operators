import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumberPair } from '../../models/number-pair';
import { NumbersService } from '../../services/numbers.service';
import { CommonModule } from '@angular/common';
import { IsNumberPipe } from '../../pipes/isNumber';

@Component({
  selector: 'app-concat-map',
  standalone: true,
  imports: [
    CommonModule,
    IsNumberPipe
  ],
  templateUrl: './concat-map.component.html',
  styleUrl: './concat-map.component.scss'
})
export class ConcatMapComponent {
  // SUBSCRIPTIONS
  private numbersSubscription?: Subscription;

  // NUMBERS
  numbers?: NumberPair[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.numbersSubscription = this.numbersService.numbers.subscribe(numbers => {
      this.numbers = numbers;
    });

    this.numbersService.useConcatMap([1, 3, 5, 78]);
    // this.numbersService.useSwitchMap();
  }

  ngOnDestroy(): void {
    this.numbersSubscription!.unsubscribe();
  }
}
