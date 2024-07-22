import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RestrauntActions from './store/actions/restraunt-list-actions';
import * as BookingSelectors from './store/selectors/booking-list-selectors';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Restraunt_App';
  loading$!: Observable<boolean>;
  currentUrl!: boolean;

  constructor(private store: Store, private route: Router) { }

  ngOnInit(): void {
    this.getRoute();
    this.store.dispatch(RestrauntActions.loadRestraunt());
    this.store.dispatch(RestrauntActions.loadBooking());
    this.loading$ = this.store.select(BookingSelectors.selectLoader);
  }

  getRoute() : void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/landingpage' || event.url === '/') {
          this.currentUrl = true;
        }
        else {
          this.currentUrl = false;
        }
      }
    });
  }
}
