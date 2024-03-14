import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'humanTime'
})
export class HumanTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {

    const d = moment(value);

    if (!d.isValid()) { return 'invalid date' }

    return d.fromNow();
  }

}
