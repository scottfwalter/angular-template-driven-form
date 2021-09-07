/** REACTIVE FORMS COMPARISON CODE. NOT USED.  */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { Hero, HeroAndLikes } from '../model';
import { DataService } from '../data.service';

class RF_HeroFormContainerComponent {
  heroForm: FormGroup;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    let data: HeroAndLikes;
    this.dataService.currentHeroAndLikes$
      .pipe(take(1))
      .subscribe(data => this.makeForm(data));
  }

  private makeForm(data: HeroAndLikes) {
    const formBuilder = new FormBuilder();
    const hero: Hero = data.hero;

    const heroForm: FormGroup = formBuilder.group({
      name:           [hero.name, Validators.required],
      alterEgo:       [hero.alterEgo],
      power:          [hero.power, Validators.required],
      powerQualifier: [hero.powerQualifier, Validators.required]
      // more ...
    });

    return heroForm;
  }
}