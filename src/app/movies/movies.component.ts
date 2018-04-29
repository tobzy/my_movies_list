import {Component, OnInit} from '@angular/core';

import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../store';
import {ActionTypes} from '../actions/movies.actions';
import {Movie} from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  @select() movies$;
  @select() loading$;
  filteredMovies: Movie[];
  filters;
  movies: Movie[];

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  getMovies(): void {
    this.ngRedux.dispatch({type: ActionTypes.FetchMovies});
  }

  filterMovies(filter): void {
    this.filters.add(filter);
    this.filteredMovies = this.filteredMovies.filter(movie => {
      return movie.genres.includes(filter);
    });
  }

  clearFilters(): void {
    this.filters.clear();
    this.filteredMovies = this.movies;
  }

  ngOnInit() {
    this.movies$.asObservable().subscribe(e => {
      this.filteredMovies = e;
      this.movies = e;
    })
    this.filters = new Set([]);
    this.getMovies();
  }

}
