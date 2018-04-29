import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {MoviesComponent} from './movies/movies.component';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

// store imports
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {IAppState, rootReducer, INITIAL_STATE} from './store';


import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {MoviesEpics} from './actions/movies.epics';
import { MovieSearchComponent } from './movie-search/movie-search.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    MoviesComponent,
    MovieSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgReduxModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [
    MoviesEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>,
              private epics: MoviesEpics) {

    const rootEpic = combineEpics(
      this.epics.getAMovie,
      this.epics.getMovies,
      this.epics.searchMovie
    );
    const middleware = [
      createEpicMiddleware(rootEpic)
    ];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware);
  }
}
