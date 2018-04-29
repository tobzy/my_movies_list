import {Component, OnInit, OnDestroy} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../store';
import {ActionTypes} from '../actions/movies.actions';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  @select() selectedMovie$;
  @select() loading$;
  movie

  constructor(private route: ActivatedRoute,
              private ngRedux: NgRedux<IAppState>,
              private location: Location) {
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch({type: ActionTypes.FetchAMovie, payload: id});
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    // subscribing here because the *ngIf doesn't react to the subject @select creates (i.e the selectedMovie$ variable)☹
    this.selectedMovie$.asObservable().subscribe(e => {
      this.movie = e;
    });

    this.getMovie();
  }

  ngOnDestroy() {
    this.ngRedux.dispatch({type: ActionTypes.ResetMovie});
  }

}
