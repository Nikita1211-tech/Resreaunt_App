import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RestrauntActions from './store/actions/restraunt-list-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Restraunt_App';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(RestrauntActions.loadRestraunt());
    this.store.dispatch(RestrauntActions.loadBookingAppointment());
  }
}
