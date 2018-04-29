import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../store';

import {ActionTypes} from '../actions/movies.actions';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {


  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  search(term: string): void {
    this.searchMovies(term);
  }

  searchMovies(term): void {
    this.ngRedux.dispatch({type: ActionTypes.SearchForAMovie, payload: term});
  }

  ngOnInit() {
  }
}
