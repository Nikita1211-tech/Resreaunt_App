import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { catchError, concatMap, exhaustMap, map, of, switchMap } from "rxjs";
import { RestrauntService } from "../../services/restraunt.service";
import { formData, Restraunt } from "../../interfaces/restraunt.interface";

@Injectable()
export class RestrauntEffects {

    constructor(private action$: Actions, private restrauntService: RestrauntService) { }

    // Loads restraunt list 
    loadRestraunt$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.loadRestraunt),
        switchMap(() => this.restrauntService.setRestrauntList().pipe(
            map((res: Restraunt[]) => RestrauntActions.loadRestrauntSuccess({ restraunts: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.loadRestrauntFailure({ error: 'Failed to load restraunts' })
        ))
    ));

    addAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.addBookingAppointment),
        switchMap(({ appointments }) =>
          this.restrauntService.addAppointment(appointments).pipe(
            map((addedAppointment: formData[]) =>
              RestrauntActions.addBookingAppointmentSuccess({ appointments: addedAppointment })
            ),
            catchError((error: any) =>
              of(RestrauntActions.addBookingAppointmentFailure({ error: 'Failed to add appointment' }))
            )
          )
        )
      ));
    
      loadAppointments$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.loadBookingAppointment),
        switchMap(() =>
          this.restrauntService.getAppointmentList().pipe(
            map((appointments: formData[]) =>
              RestrauntActions.loadBookingAppointmentSuccess({ appointments })
            ),
            catchError((error: any) =>
              of(RestrauntActions.loadBookingAppointmentFailure({ error: 'Failed to load appointments' }))
            )
          )
        )
      ));

    // Deletes appointment list
    deleteAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.deleteBookedAppointment),
        switchMap(({ id }) => this.restrauntService.deleteAppointment(id).pipe(
            map((res: number) => RestrauntActions.deleteBookedAppointmentSuccess({ id: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.deleteBookedAppointmentFailure({ error: 'Failed to delete appointment' })
        ))
    ));

    // Updates appointment list
    updateAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.updateBookedAppointment),
        switchMap(({ appointment }) => this.restrauntService.updateAppointment(appointment).pipe(
            map((res: formData) => RestrauntActions.updateBookedAppointmentSuccess({ appointment: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.updateBookedAppointmentFailure({ error: 'Failed to update appointment' })
        ))
    ));
}