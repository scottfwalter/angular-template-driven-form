import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgModel, Validators } from '@angular/forms';

import { forbiddenNameValidator } from '../../validation/like-validation';
import { Like } from '../../model';
import { formViewProvider } from '../../form-view-provider';

@Component({
  selector: 'app-like-nested-form',
  templateUrl: './like-nested.component.html',
  viewProviders: [ formViewProvider ],
})
export class LikeNestedFormComponent implements AfterViewInit {
  @Input() like: Like;
  @Output() remove = new EventEmitter<Like>();
  @ViewChild('name') nameControl: NgModel;

  static compCounter = 0;
  grpName ='Like-' + LikeNestedFormComponent.compCounter++;

  ngAfterViewInit() {
    this.addForbiddenNameValidator();
  }

  // Validator manipulation explained in https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946

  /** Add the ForbiddenName validator which is missing from the template */ 
  private addForbiddenNameValidator () {

    const formControl = this.nameControl.control;
    
    formControl.setValidators([
      Validators.required, forbiddenNameValidator()
    ]);

    // Wait a tick to avoid `ExpressionChangedAfterItHasBeenCheckedError`
    setTimeout(() => formControl.updateValueAndValidity());
  }
}
