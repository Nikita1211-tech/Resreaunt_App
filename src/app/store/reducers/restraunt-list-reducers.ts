import { createReducer, on } from "@ngrx/store";
import { Restraunt } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';

export interface RestrauntState {
    restraunts: Restraunt[];
    loading: boolean;
    error: string | null;
}

const initialRestrauntState: RestrauntState = {
    restraunts: [],
    loading: false,
    error: null
}

export const restrauntReducer = createReducer(initialRestrauntState,
    on(RestrauntActions.loadRestraunt, (state) => ({
        ...state,
        loading: true
    })),
    on(RestrauntActions.loadRestrauntSuccess, (state, { restraunts }) => ({
        ...state,
        restraunts: restraunts,
        loading: false
    })),
    on(RestrauntActions.loadRestrauntFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    }))
);
