import { createReducer, on } from "@ngrx/store";
import { formData, Restraunt } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';

export interface AppState {
    restraunts: Restraunt[];
    appointments: formData[];
    error: string | null;
}

const initialAppState: AppState = {
    restraunts: [],
    appointments: [],
    error: null
}

// Loads restraunt list 
export const restrauntReducer = createReducer(initialAppState,
    on(RestrauntActions.loadRestrauntSuccess, (state, { restraunts }) => ({
        ...state,
        restraunts: restraunts,
        error: null
    })),
    on(RestrauntActions.loadRestrauntFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(RestrauntActions.loadBookingAppointmentSuccess, (state, { appointments }) => {
        console.log('Loading booking appointment success. New state:', { ...state, appointments });
        let newAppointment = [...state.appointments, ...appointments];
        console.log(newAppointment)
        return {
            ...state,
            appointments: appointments
        };
    }),
    on(RestrauntActions.addBookingAppointmentSuccess, (state, { appointments }) => {
        console.log('Adding booking appointment success. New state:', { ...state.appointments, appointments });
        let newAppointment = [...state.appointments, ...appointments];
        console.log(newAppointment)
        return {
            ...state,
            appointments: newAppointment
        };
    }),
    on(RestrauntActions.updateBookedAppointmentSuccess, (state, { appointment }) => {
        const updatedAppointments = state.appointments.map((item) => {
            if (item.id === appointment.id) {
                return {
                    ...item,
                    ...appointment
                };
            }
            return item;
        });
        return {
            ...state,
            appointments: updatedAppointments
        };
    }),
    // on(RestrauntActions.deleteBookedAppointmentSuccess, (state, { id }) => {
    //     state.appointments.filter((item) => item.id !== id)
    // })
)

// Load, add, delete and update appointment list
// export const appointmentReducer = createReducer(
//     initialAppState,
//     on(RestrauntActions.loadBookingAppointmentSuccess, (state, { appointments }) => {
//         console.log('Loading booking appointment success. New state:', { ...state, appointments });
//         // let newAppointment = [...state.appointments, appointments];
//         return {
//             ...state,
//             appointments: [...appointments]
//         };
//     }),
//     on(RestrauntActions.addBookingAppointmentSuccess, (state, { appointments }) => {
//         console.log('Adding booking appointment success. New state:', { ...state.appointments, appointments });
//         let newAppointment = [...state.appointments, appointments];
//         console.log(newAppointment)
//         return {
//             ...state,
//             apointments: [...state.appointments, appointments]
//         };
//     }),
// on(RestrauntActions.loadBookingAppointmentSuccess, (state, { appointments }) => {
//     console.log('Loading booking appointment success. New state:', { ...state, appointments });
//     // let newAppointment = [...state.appointments, appointments];
//     return {
//         ...state,
//         appointments: [...appointments]
//     };
// }),
// on(RestrauntActions.deleteBookedAppointmentSuccess, RestrauntActions.updateBookedAppointmentSuccess,
//     (state, { appointments }) => {
//         console.log('Deleting/updating booked appointment success. New state:', { ...state, appointments });
//         return {
//             ...state,
//             appointments: [...appointments]
//         };
//     }
// )
// );