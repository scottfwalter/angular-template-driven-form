import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, skip } from 'rxjs/operators';

import { Hero, HeroAndLikes } from '../model';
import { ngIfAnim } from '../animations';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  animations: [ngIfAnim],
})
export class HeroFormComponent implements AfterViewInit {
  /** Current "ViewModel" of the hero for editing. */
  @Input() vm: HeroAndLikes;

  /** Index of the selected "Likes" UI implementation */
  @Input() selectedUi = '0';

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() selectedUiChanged = new EventEmitter<string>();

  @ViewChild('heroForm') form: NgForm;

  addHero() {
    this.vm.hero = { power: null, powerQualifier: null } as Hero;
    this.vm.likes = [];
    this.form.reset(); // clear status flags from previous hero editing
  }

  onSubmit() { 
    this.save.emit(this.vm); 
  }
  
  inspect() {
    console.log('Hero Form Controls', this.form.controls);
    console.log('Hero Form Value', this.form.value);
    console.log('Hero ViewModel', this.vm);
  }

  ngAfterViewInit() {
    // Report when the hero form's "name" changes.
    // Illustrates listening to valueChanges observable.
    this.form.valueChanges.pipe(
      debounceTime(500),
      map(changes => changes.name || ''), // look only at the hero name
      distinctUntilChanged(),
      skip(1), // skip form initialization phase
    )
    .subscribe(nameChange => {
      console.log(`Hero Form: name changed to "${nameChange}"`);
    });
  }
}
