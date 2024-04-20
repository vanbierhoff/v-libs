import { Pipe, PipeTransform } from '@angular/core';
import { ValidationError } from '@v/store';


@Pipe({
  name: 'getError',
  standalone: true
})
export class GetErrorPipe implements PipeTransform {
  transform(value: ValidationError[]): any {
    let errorString = '';
    if (value && value.length === 0) {
      return '';
    }
    value.forEach(error => errorString += error.errorMessage);
    return errorString;
  }

}
