import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, NgModelGroup} from '@angular/forms';

/** Display first validation error message found in the control or its tree of controls
 * if the control has been touched or is not valid. 
 * Similar technique for Reactive Forms. */
@Component({
  selector: 'app-validation-error',
  template: `
    <div *ngIf="control.invalid && control.touched && control.enabled"
      class="alert alert-danger">
      {{ errorMessage }}
    </div>
  `
})
export class ValidationErrorComponent {
  /** Forms Control with potential errors. 
   * Can be an aggregate control such as FormGroup 
   * or Template-Driven control wrapper such as NgModel and NgModelGroup. */
  @Input() control: AbstractControl;

  get errorMessage() {
    return getErrorMessage(this.control);
  }
}


function getErrorMessage(control: AbstractControl ) {
  const errors = control.errors;
  if (errors) {
    if (errors.required) {
      return 'Value is required'
    } else if (errors.forbiddenName ) {
      return 'No one likes star wars'
    }
  }

  /** NgModelGroup wraps the FormGroup with the error information */
  if (control instanceof NgModelGroup) {
    control = control.control
  }

  if (control instanceof FormGroup) {
    const controls = Object.values(control.controls);
    for (const c of controls) {
      const msg = getErrorMessage(c);
      if (msg) {
        return msg;
      }
    }
  }
  return null;
}
