import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

import { forbiddenNameValidator } from './like-validation';

/** Validator directive to add declaritively in the Template-Driven template */
@Directive({
  selector: '[forbiddenName]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: ForbiddenNameValidatorDirective, 
    multi: true
  }]
})
export class ForbiddenNameValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenNameValidator()(control);
  }
}

// #region configurable direcive

/** Configurable Validator directive to add declaritively in the Template-Driven template 
 * By default, any name that contains "star wars" is forbidden
 * Set the attribute with a different forbidden name. Ex: forbiddenName="bob"
*/
@Directive({
  selector: '[forbiddenName]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: ConfigurableForbiddenNameValidatorDirective, 
    multi: true
  }]
})
export class ConfigurableForbiddenNameValidatorDirective implements Validator {
  @Input() forbiddenName: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const re = this.forbiddenName 
      ? new RegExp(this.forbiddenName, 'i') 
      : /(star).*(wars)/i;
    return forbiddenNameValidator(re)(control);
  }
}

// #endregion configurable version (not used in this demo)
