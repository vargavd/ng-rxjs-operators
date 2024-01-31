import { Component, OnDestroy, OnInit } from '@angular/core';
import { NumbersService } from '../../services/numbers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {
  // SUBSCRIPTIONS
  private origNumbersSubscription?: Subscription;
  private convertedNumbersSubscription?: Subscription;

  // NUMBERS
  origNumbers?: number[];
  convertedNumbers?: number[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.origNumbersSubscription = this.numbersService.originalNumbers.subscribe(origNumbers => {
      this.origNumbers = origNumbers;
      console.log(origNumbers);
    });
    this.convertedNumbersSubscription = this.numbersService.convertedNumbers.subscribe(convertedNumbers => {
      this.convertedNumbers = convertedNumbers;
      console.log(convertedNumbers);
    });

    this.numbersService.useMap([1, 3, 5, 78]);
    // this.numbersService.useSwitchMap();
  }

  ngOnDestroy(): void {
    this.origNumbersSubscription!.unsubscribe();
    this.convertedNumbersSubscription!.unsubscribe();
  }
}
