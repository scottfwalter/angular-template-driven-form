import { Hero } from './hero';
import { Like } from './like';

export interface Data {
  heroes: Hero[],
  likes: Like[],

  currentHeroId: number,
  selectedUi: string
}


export interface HeroAndLikes {
  hero: Hero,
  likes: Like[],
}
