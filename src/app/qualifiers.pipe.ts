import { Pipe, PipeTransform } from '@angular/core';
import { powers } from './model';

/** Returns the array of power qualifers for the given super power */
@Pipe({ name: 'qualifiers', pure: true })
export class QualifiersPipe implements PipeTransform {
  transform(powerSource: string) {
    const power = powers.find(p => p.name === powerSource);
    return power ? power.qualifiers : [];
  }
}
