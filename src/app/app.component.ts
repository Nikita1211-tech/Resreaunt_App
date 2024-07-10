import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RestrauntActions from './store/actions/restraunt-list-actions';
import * as RestrauntSelectors from './store/selectors/restraunt-list-selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Restraunt_App';
  loading$!: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(RestrauntActions.loadRestraunt());
    this.store.dispatch(RestrauntActions.loadBookingAppointment());
    this.loading$ = this.store.select(RestrauntSelectors.selectLoader);
  }
}
