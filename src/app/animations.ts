// Courtesy https://auth0.com/blog/real-world-angular-series-part-5/
import { trigger, transition, style, animate, state } from '@angular/animations';

const expandCollapseAnimations = [
  state(
    '*',
    style({
      // enter
      height: '*',
      opacity: 1,
      'overflow-y': 'hidden',
    })
  ),
  state(
    'void',
    style({
      // leave
      height: '0',
      opacity: 0,
      'overflow-y': 'hidden'
    })
  ),
  transition(':leave', animate('250ms ease-out')),
  transition(':enter', animate('250ms ease-in'))
];

/**
 * Animation for exposing content when *ngIf is true
 * @example
 * // Component file
 * import { ngIfAnim } from '@animations';
 * @Component({
 *   ...
 *   animations: [ngIfAnim]
 * })
 * // Template
 * <div *ngIf="error" class="error" [@ngIfAnim]>{{error}}</div>
 */
export const ngIfAnim = trigger('ngIfAnim', expandCollapseAnimations);