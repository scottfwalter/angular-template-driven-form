import { Component, Input } from '@angular/core';

import { formViewProvider } from '../form-view-provider';
import { Hero, powers } from '../model';

@Component({
  selector: 'app-hero-edit-qualifier',
  templateUrl: './hero-edit-qualifier.component.html',
  styleUrls: ['./hero-edit.css'],
  styles: ['.alert { margin-top: 4px }'],
  viewProviders: [ formViewProvider ],
})
export class HeroEditQualifierComponent {
  @Input() hero: Hero;

  get hasQualifiers() {
    const pow = powers.find(p => p.name === this.hero.power);
    return pow && pow.qualifiers && pow.qualifiers.length > 0;
  }
}
