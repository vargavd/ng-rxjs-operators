import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersService } from '../../services/numbers.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  // SUBSCRIPTIONS
  private origNumbersSubscription?: Subscription;
  private convertedNumbersSubscription?: Subscription;

  // NUMBERS
  origNumbers?: number[];
  convertedNumbers?: number[];


  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    // this.numbersService.reset();

    // this.origNumbersSubscription = this.numbersService.originalNumbers.subscribe(origNumbers => {
    //   this.origNumbers = origNumbers;
    // });
    // this.convertedNumbersSubscription = this.numbersService.convertedNumbers.subscribe(convertedNumbers => {
    //   this.convertedNumbers = convertedNumbers;
    // });

    // this.numbersService.useFilter([1, 2, 3, 54, 103, 104]);
  }

  ngOnDestroy(): void {
    this.origNumbersSubscription!.unsubscribe();
    this.convertedNumbersSubscription!.unsubscribe();
  }
}
