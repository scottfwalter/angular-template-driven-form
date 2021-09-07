import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { deepClone, HeroAndLikes } from '../model';
import { DataService } from '../data.service';
import { ngIfAnim } from '../animations';

@Component({
  selector: 'app-hero-form-container',
  templateUrl: './hero-form-container.component.html',
  animations: [ngIfAnim]
})
export class HeroFormContainerComponent {

  constructor(private dataService: DataService) {}

  /** Current hero graph straight from cache */
  currentHeroAndLikes$ = this.dataService.currentHeroAndLikes$;

  /** Observable of the ViewModel: a reshaped, cloned, current hero data. */
  vm$ = this.currentHeroAndLikes$.pipe(
    map(data => deepClone(data))
  );


  editing = true;

  save(vm: HeroAndLikes) {
    this.dataService.saveHeroAndLikes(vm);
    this.editing = false;
  }

  close() {
    this.editing = false;
  }


  /** Index of the selected "Likes" UI implementation */
  selectedUi$ = this.dataService.selectedUi$;

  updateSelectedUi(selectedUi: string) {
    this.dataService.updateSelectedUi(selectedUi);
  }
}
