import {Movie} from './movie';
import {ActionTypes} from './actions/movies.actions';

export interface IAppState {
  movies: Movie[];
  selectedMovie: Object;
  loading: Boolean;
}

export const INITIAL_STATE: IAppState = {
  movies: [],
  selectedMovie: {},
  loading: false
}

export function rootReducer(state: IAppState, action) {
  switch (action.type) {
    case ActionTypes.FetchMovies:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.SearchForAMovie:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.LoadMovies:
      return {
        ...state,
        movies: [...action.payload],
        loading: false
      };
    case ActionTypes.FetchAMovie:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.ResetMovie:
      return {
        ...state,
        selectedMovie: {},
        loading: false
      };
    case ActionTypes.LoadAMovie:
      const movie = {...action.payload}
      movie['imageUrl'] = `/assets/images/movie-covers/${movie['key']}.jpg`
      return {
        ...state,
        selectedMovie: movie,
        loading: false
      };
  }
  return state;
}
