import { AbstractControl, ValidatorFn } from '@angular/forms';

/** 
 * Name can't match a regular expression that identifies a forbidden name.
 * Any name that contains "star wars" is forbidden by default.
 * Supply a different forbidden name as regEx if you like.
 */
export function forbiddenNameValidator(nameRe?: RegExp): ValidatorFn {
  nameRe = nameRe || /(star).*(wars)/i;
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
