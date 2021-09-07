import { Component, EventEmitter, Input, Output } from '@angular/core';

import { formViewProvider } from '../form-view-provider';
import { HeroAndLikes, Like, nextNewId } from '../model';
import { ngIfAnim } from '../animations';

@Component({
  selector: 'app-likes-edit',
  templateUrl: './likes-edit.component.html',
  animations: [ngIfAnim],
  styles: ['select { max-width: 30rem; }'],
  viewProviders: [ formViewProvider ],
})
export class LikesEditComponent {
  @Input() model: HeroAndLikes;
  @Input() selectedUi: string;
  @Output() selectedUiChanged = new EventEmitter<string>();

  addLike() {
    const heroId = this.model.hero.id;
    const newLikes = this.model.likes.concat(
      { id: nextNewId(), heroId, name: '' }
    );
    this.model.likes = newLikes;
  }

  removeLike(like: Like) {
    this.model.likes = this.model.likes.filter(l => l !== like);
  }
}
