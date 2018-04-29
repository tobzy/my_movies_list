import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionTypes} from '../actions/movies.actions';
import {Movie} from '../movie';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MoviesEpics {
  private moviesUrl = 'api/movies';

  constructor(private http: HttpClient) {
  }

  // I'm using epics from redux-observable so that I can use use the
  // middleware to resolve observables returned from my http calls.
  getMovies = (action$) => {
    return action$.ofType(ActionTypes.FetchMovies)
      .mergeMap(() => {
        return this.http.get<Movie[]>(this.moviesUrl)
          .map(result => ({
            type: ActionTypes.LoadMovies,
            payload: result
          }))
        .catch(error => Observable.of({
          type: ActionTypes.LoadMoviesError
        }));
      });
  }


  getAMovie = (action$) => {
    return action$.ofType(ActionTypes.FetchAMovie)
      .mergeMap((action) => {
        const url = `${this.moviesUrl}/${action.payload}`;
        return this.http.get<Movie>(url)
          .map(result => ({
            type: ActionTypes.LoadAMovie,
            payload: result
          }))
          .catch(error => Observable.of({
            type: ActionTypes.LoadMoviesError
          }));
      });
  }

  searchMovie = (action$) => {
    return action$.ofType(ActionTypes.SearchForAMovie)
      .mergeMap((action) => {
        const url = `${this.moviesUrl}/?name=${action.payload}`;
        return this.http.get<Movie[]>(url)
          .map(result => ({
            type: ActionTypes.LoadMovies,
            payload: result
          }))
          .catch(error => Observable.of({
            type: ActionTypes.LoadMoviesError
          }));
      });
  }
}
