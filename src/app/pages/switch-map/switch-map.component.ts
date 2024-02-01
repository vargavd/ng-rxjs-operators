import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IsNumberPipe } from '../../pipes/isNumber';
import { Subscription } from 'rxjs';
import { NumberPair } from '../../models/number-pair';
import { NumbersService } from '../../services/numbers.service';

@Component({
  selector: 'app-switch-map',
  standalone: true,
  imports: [
    CommonModule,
    IsNumberPipe
  ],
  templateUrl: './switch-map.component.html',
  styleUrl: './switch-map.component.scss'
})
export class SwitchMapComponent {
  // SUBSCRIPTIONS
  private numbersSubscription?: Subscription;

  // NUMBERS
  numbers?: NumberPair[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.numbersSubscription = this.numbersService.numbers.subscribe(numbers => {
      this.numbers = numbers;
    });

    this.numbersService.useSwitchMap([1, 3, 5, 78]);
    // this.numbersService.useSwitchMap();
  }

  ngOnDestroy(): void {
    this.numbersSubscription!.unsubscribe();
  }
}
