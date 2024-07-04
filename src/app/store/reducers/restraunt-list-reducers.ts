import { createReducer, on } from "@ngrx/store";
import { Restraunt } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';

export interface RestrauntState {
    restraunts: Restraunt[];
    error: string | null;
}

const initialRestrauntState: RestrauntState = {
    restraunts: [],
    error: null
}

export const restrauntReducer = createReducer(initialRestrauntState, 
    on(RestrauntActions.loadRestrauntSuccess, (state, {restraunts}) => ({
        ...state,
        restraunts,
        error: null
    })),
    on(RestrauntActions.loadRestrauntFailure, (state, {error}) => ({
        ...state,
        error: error
    }))
)

// export const appointmentReducer = createReducer(initialRestrauntState,
//     on()
// )