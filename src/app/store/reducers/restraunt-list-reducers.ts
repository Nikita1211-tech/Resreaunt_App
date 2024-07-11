import { createReducer, on } from "@ngrx/store";
import { Appointment, Restraunt } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { appointmentListKey } from "../../enum/localStorage-enum";

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

export interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
}

const initialAppointmentState: AppointmentState = {
    appointments: [],
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

export const appointmentReducer = createReducer(initialAppointmentState,
    on(RestrauntActions.loadBookingAppointment, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RestrauntActions.loadBookingAppointmentSuccess, (state, { appointments }) => {
        return {
            ...state,
            appointments: appointments,
            loading: false
        };
    }),
    on(RestrauntActions.addBookingAppointment, RestrauntActions.deleteBookedAppointment, RestrauntActions.updateBookedAppointment, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RestrauntActions.addBookingAppointmentSuccess, (state, { appointments }) => {
        let newAppointment = [...state.appointments, ...appointments];
        localStorage.setItem(appointmentListKey, JSON.stringify(newAppointment));
        return {
            ...state,
            appointments: newAppointment,
            loading: false
        };
    }),
    on(RestrauntActions.updateBookedAppointmentSuccess, (state, { appointment }) => {
        let updatedAppointment = state.appointments.map((item) => {
            if (item.id === appointment.id) {
                return {
                    ...item,
                    ...appointment
                };
            }
            return item;
        });
        localStorage.setItem(appointmentListKey, JSON.stringify(updatedAppointment));
        return {
            ...state,
            appointments: updatedAppointment,
            loading: false
        };
    }),
    on(RestrauntActions.deleteBookedAppointmentSuccess, (state, { id }) => {
        let updatedAppointments = state.appointments.filter(appointment => appointment.id !== id);
        localStorage.setItem(appointmentListKey, JSON.stringify(updatedAppointments));
        return {
            ...state,
            appointments: updatedAppointments,
            loading: false
        };
    }),
    on(RestrauntActions.loadBookingAppointmentFailure,
        RestrauntActions.addBookingAppointmentFailure, RestrauntActions.updateBookedAppointmentFailure,
        RestrauntActions.deleteBookedAppointmentFailure, (state, { error }) => ({
            ...state,
            error: error,
            loading: false
        }
    ))
);
