import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { catchError, map, of, switchMap } from "rxjs";
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

    // Loads appointment list
    loadAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.loadBookingAppointment),
        switchMap(() => this.restrauntService.getAppointmentList().pipe(
            map((res: formData[]) => RestrauntActions.loadBookingAppointmentSuccess({ appointments: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.loadBookingAppointmentFailure({ error: 'Failed to load appointment' })
        ))
    ));

    // Adds appointment list
    addAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.addBookingAppointment),
        switchMap(({ appointments }) => this.restrauntService.addAppointment(appointments).pipe(
            map((res: formData[]) => RestrauntActions.addBookingAppointmentSuccess({ appointments: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.addBookingAppointmentFailure({ error: 'Failed to add appointment' })
        ))
    ));

    // Deletes appointment list
    deleteAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.deleteBookedAppointment),
        switchMap(({ appointments }) => this.restrauntService.deleteAppointment(appointments).pipe(
            map((res: formData[]) => RestrauntActions.deleteBookedAppointmentSuccess({ appointments: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.deleteBookedAppointmentFailure({ error: 'Failed to delete appointment' })
        ))
    ));

    // Updates appointment list
    updateAppointment$ = createEffect(() => this.action$.pipe(
        ofType(RestrauntActions.updateBookedAppointment),
        switchMap(({ appointments }) => this.restrauntService.updateAppointment(appointments).pipe(
            map((res: formData[]) => RestrauntActions.updateBookedAppointmentSuccess({ appointments: res }))
        )),
        catchError((error: { message: string }) => of(
            RestrauntActions.updateBookedAppointmentFailure({ error: 'Failed to update appointment' })
        ))
    ));
}