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
export const appointmentReducer = createReducer(
    initialAppointmentState,
    on(RestrauntActions.loadBookingAppointmentSuccess, (state, { appointments }) => {
        console.log('Loading booking appointment success. New state:', { ...state, appointments });
        return {
            ...state,
            appointments
        };
    }),
    on(RestrauntActions.addBookingAppointmentSuccess, (state, { appointments }) => {
        console.log('Adding booking appointment success. New state:', { ...state, ...appointments });
        let newAppointment = [...state.appointments, ...appointments];
        console.log(newAppointment)
        return {
            ...state,
            appointments: newAppointment
        };
    }),
    on(
        RestrauntActions.deleteBookedAppointmentSuccess,
        RestrauntActions.updateBookedAppointmentSuccess,
        (state, { appointments }) => {
            console.log('Deleting/updating booked appointment success. New state:', { ...state, appointments });
            return {
                ...state,
                appointments: [...appointments]
            };
        }
    )
);