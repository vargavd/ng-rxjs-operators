import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'isNumber',
  standalone: true,
})
export class IsNumberPipe implements PipeTransform {
  transform(item: any): boolean {
    return !isNaN(item);
  }
}