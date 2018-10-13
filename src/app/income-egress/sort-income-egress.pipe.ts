import { Pipe, PipeTransform } from '@angular/core';
import { IncomeEgress } from './income-egress.models';

@Pipe({
  name: 'sortIncomeEgress'
})
export class SortIncomeEgressPipe implements PipeTransform {

  transform(items: IncomeEgress[]): IncomeEgress[] {
    return items.sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
