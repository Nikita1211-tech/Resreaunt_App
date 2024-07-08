import { ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store";
import { formData, Restraunt } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';

export interface RestrauntState {
    restraunts: Restraunt[];
    error: string | null;
}

const initialRestrauntState: RestrauntState = {
    restraunts: [],
    error: null
}

export interface AppointmentState {
    appointments: formData[];
    error: string | null;
}

const initialAppointmentState: AppointmentState = {
    appointments: [],
    error: null
}

// Loads restraunt list 
export const restrauntReducer = createReducer(initialRestrauntState,
    on(RestrauntActions.loadRestrauntSuccess, (state, { restraunts }) => ({
        ...state,
        restraunts,
        error: null
    })),
    on(RestrauntActions.loadRestrauntFailure, (state, { error }) => ({
        ...state,
        error: error
    }))
);

// Load, add, delete and update appointment list 
export const appointmentReducer = createReducer(initialAppointmentState,
    on(RestrauntActions.addBookingAppointment, RestrauntActions.loadBookingAppointmentSuccess,
        RestrauntActions.deleteBookedAppointmentSuccess, RestrauntActions.updateBookedAppointmentSuccess,
        (state, { appointments }) => ({
            ...state,
            appointments,
            error: null
        })),
    on(RestrauntActions.loadBookingAppointmentFailure, RestrauntActions.deleteBookedAppointmentFailure,
        RestrauntActions.updateBookedAppointmentFailure, (state, { error }) => ({
            ...state,
            error: error
        }))
);