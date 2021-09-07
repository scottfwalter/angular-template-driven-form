import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HeroAndLikes } from '../model';

@Component({
  selector: 'app-hero-display',
  template: `
    <div class="row">
      <div class="col-xs-4">Name</div>
      <div class="col-xs-8">{{ vm.hero.name }}</div>
    </div>
    <div class="row">
      <div class="col-xs-4">Alter Ego</div>
      <div class="col-xs-8">{{ vm.hero.alterEgo }}</div>
    </div>
    <div class="row">
      <div class="col-xs-4">Power</div>
      <div class="col-xs-8">{{ vm.hero.power }}</div>
    </div>
    <div class="row">
      <div class="col-xs-4">Power Qualifier</div>
      <div class="col-xs-8">{{ vm.hero.powerQualifier }}</div>
    </div>
    <div class="row">
      <div class="col-xs-4">Likes</div>
      <div class="col-xs-8">{{ likes }}</div>
    </div>
    <br>
    <button class="btn btn-primary" (click)="edit.emit()">Edit</button>
  `,
})
export class HeroDisplayComponent  {
  @Input() vm: HeroAndLikes;
  @Output() edit = new EventEmitter();
  
  get likes() {
    const likes = this.vm.likes || [];
    return likes.length > 0
      ? likes.map(l => l.name).join(', ')
      : 'none';
  }
}
