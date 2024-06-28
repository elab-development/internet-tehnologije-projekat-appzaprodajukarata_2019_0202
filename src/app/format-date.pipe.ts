import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string | null, format: string = 'mediumDate'): string {
    if (value === null) {
      return ''; // Ako je vrednost null, vraćamo prazan string
    }

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format) || ''; // Dodajemo ili prazan string kao podrazumevanu vrednost ako datePipe.transform vrati null
  }

}
