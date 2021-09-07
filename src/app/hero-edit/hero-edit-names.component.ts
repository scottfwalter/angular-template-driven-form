import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { Hero } from '../model';

@Component({
  selector: 'app-hero-edit-names',
  templateUrl: './hero-edit-names.component.html',
  styleUrls: ['./hero-edit.css'],
  // #region ViewProviders
  /* 
   * BIG TROUBLE WITHOUT THIS VIEWPROVIDER
   * True for Reactive Forms as well.
   * See Kara's talk: https://youtu.be/CD_t3m2WMM8?t=1826
   * See also formViewProvider in this project
   * COMMENT OUT to see:
   * - NgForm has no controls! Controls are detached from the form.
   * - Form-level status values (touched, valid, etc.) no longer change
   * - Controls still validate, update model, and update their statuses
   */
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  // #endregion
})
export class HeroEditNamesComponent {
  @Input() hero: Hero;
}
