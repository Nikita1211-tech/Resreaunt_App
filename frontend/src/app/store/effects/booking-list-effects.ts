import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { catchError, delay, map, of, switchMap } from "rxjs";
import { RestrauntService } from "../../services/restraunt.service";
import { Booking } from "../../interfaces/restraunt.interface";
import { RESTAURANT_BOOKING_UNSUCCESSFUL, RESTAURANT_DELETION_UNSUCCESSFUL, RESTAURANT_UPDATION_UNSUCCESSFUL } from "../../enum/messages-enum";

@Injectable()
export class BookingEffects {

  constructor(private action$: Actions, private restrauntService: RestrauntService) { }

  // Loads booking list 
  loadBookings$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.loadBooking),
    switchMap(() =>
      this.restrauntService.getBookingList().pipe(
        // delay(1000),
        map((booking: Booking[]) =>
          RestrauntActions.loadBookingSuccess({ booking })
        ),
        catchError((error: { message: string }) =>
          of(RestrauntActions.loadBookingFailure({ error: error.message }))
        )
      )
    )
  ));

  // Adds new booking in booking list
  addBooking$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.addBooking),
    switchMap(({ booking }) =>
      this.restrauntService.addBooking(booking).pipe(
        // delay(1000),
        map((booking) =>
          RestrauntActions.addBookingSuccess({ booking })
        ),
        catchError((error) =>
          of(RestrauntActions.addBookingFailure({ error: RESTAURANT_BOOKING_UNSUCCESSFUL }))
        )
      )
    )
  ));

  // Deletes a booking from booking list
  deleteBooking$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.deleteBooking),
    switchMap(({ id }) => this.restrauntService.deleteBooking(id).pipe(
      // delay(1000),
      map((res: number) => RestrauntActions.deleteBookingSuccess({ id: res }))
    )),
    catchError((error: { message: string }) => of(
      RestrauntActions.deleteBookingFailure({ error: RESTAURANT_DELETION_UNSUCCESSFUL })
    ))
  ));

  // Updates a booking in booking list
  updateBooking$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.updateBooking),
    switchMap(({ booking }) => this.restrauntService.updateBooking(booking).pipe(
      // delay(1000),
      map((res: Booking) => RestrauntActions.updateBookingSuccess({ booking: res }))
    )),
    catchError((error: { message: string }) => of(
      RestrauntActions.updateBookingFailure({ error: RESTAURANT_UPDATION_UNSUCCESSFUL })
    ))
  ));
}