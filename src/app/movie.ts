import {GenreType} from './movie.model';

export class Movie {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: GenreType[];
  rate: string;
  length: string;
  img: string;
}
