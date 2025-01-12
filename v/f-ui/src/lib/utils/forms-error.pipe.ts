import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formsError',
  standalone: true,
})
export class FormsErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | null | undefined): string[] {
    if (!value) return [];
    const errors: string[] = [];

    for (const key in value) {
      errors.push(key);
    }

    return errors;
  }
}
