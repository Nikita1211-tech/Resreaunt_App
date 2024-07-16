import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { catchError, delay, map, of, switchMap } from "rxjs";
import { RestrauntService } from "../../services/restraunt.service";
import { Restraunt } from "../../interfaces/restraunt.interface";

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
}