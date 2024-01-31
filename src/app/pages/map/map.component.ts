import { Component, OnDestroy, OnInit } from '@angular/core';
import { NumbersService } from '../../services/numbers.service';
import { Subscription } from 'rxjs';
import { NumberPair } from '../../models/number-pair';
import { CommonModule } from '@angular/common';
import { IsNumberPipe } from '../../pipes/isNumber';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    IsNumberPipe
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {
  // SUBSCRIPTIONS
  private numbersSubscription?: Subscription;

  // NUMBERS
  numbers?: NumberPair[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.numbersSubscription = this.numbersService.numbers.subscribe(numbers => {
      this.numbers = numbers;
    });

    this.numbersService.useMap([1, 3, 5, 78]);
    // this.numbersService.useSwitchMap();
  }

  ngOnDestroy(): void {
    this.numbersSubscription!.unsubscribe();
  }
}
