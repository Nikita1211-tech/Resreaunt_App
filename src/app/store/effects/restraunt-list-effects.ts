import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { catchError, delay, map, of, switchMap, throwError, timeout } from "rxjs";
import { RestrauntService } from "../../services/restraunt.service";
import { Appointment, Restraunt } from "../../interfaces/restraunt.interface";

@Injectable()
export class RestrauntEffects {

  constructor(private action$: Actions, private restrauntService: RestrauntService) { }

  // Loads restraunt list 
  loadRestraunt$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.loadRestraunt),
    switchMap(() => this.restrauntService.getRestrauntList().pipe(
      delay(1000),
      map((res: Restraunt[]) => RestrauntActions.loadRestrauntSuccess({ restraunts: res }))
    )),
    catchError((error: { message: string }) => of(
      RestrauntActions.loadRestrauntFailure({ error: error.message })
    ))
  ));

  // Loads appointment list 
  loadAppointments$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.loadBookingAppointment),
    switchMap(() =>
      this.restrauntService.getAppointmentList().pipe(
        delay(1000),
        map((appointments: Appointment[]) =>
          RestrauntActions.loadBookingAppointmentSuccess({ appointments })
        ),
        catchError((error: { message: string }) =>
          of(RestrauntActions.loadBookingAppointmentFailure({ error: error.message }))
        )
      )
    )
  ));

  // Adds appointment in appointment list
  addAppointment$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.addBookingAppointment),
    switchMap(({ appointments }) =>
      this.restrauntService.addAppointment(appointments).pipe(
        delay(1000),
        map((addedAppointment: Appointment[]) =>
          RestrauntActions.addBookingAppointmentSuccess({ appointments: addedAppointment })
        ),
        catchError((error: { message: string }) =>
          of(RestrauntActions.addBookingAppointmentFailure({ error: error.message }))
        )
      )
    )
  ));

  // Deletes an appointment from appointment list
  deleteAppointment$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.deleteBookedAppointment),
    switchMap(({ id }) => this.restrauntService.deleteAppointment(id).pipe(
      delay(1000),
      map((res: number) => RestrauntActions.deleteBookedAppointmentSuccess({ id: res }))
    )),
    catchError((error: { message: string }) => of(
      RestrauntActions.deleteBookedAppointmentFailure({ error: error.message })
    ))
  ));

  // Updates an appointment in appointment list
  updateAppointment$ = createEffect(() => this.action$.pipe(
    ofType(RestrauntActions.updateBookedAppointment),
    switchMap(({ appointment }) => this.restrauntService.updateAppointment(appointment).pipe(
      delay(1000),
      map((res: Appointment) => RestrauntActions.updateBookedAppointmentSuccess({ appointment: res }))
    )),
    catchError((error: { message: string }) => of(
      RestrauntActions.updateBookedAppointmentFailure({ error: error.message })
    ))
  ));
}