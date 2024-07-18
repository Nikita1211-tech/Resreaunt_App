import { createReducer, on } from "@ngrx/store";
import { Booking } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { BOOKING_ADDED, BOOKING_DELETED, BOOKING_UPDATED } from "../../enum/messages-enum";
import { ADD_BOOKING } from "../../enum/state-enum";

export interface BookingState {
    bookings: Booking[];
    loading: boolean;
    success: string | null,
    error: string | null;
}

const initialBookingState: BookingState = {
    bookings: [],
    loading: false,
    success: null,
    error: null
}

export const bookingReducer = createReducer(initialBookingState,
    on(RestrauntActions.loadBooking, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RestrauntActions.loadBookingSuccess, (state, { booking }) => {
        return {
            ...state,
            bookings: booking,
            loading: false
        };
    }),
    on(RestrauntActions.addBooking, RestrauntActions.deleteBooking, RestrauntActions.updateBooking,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(RestrauntActions.addBookingSuccess, (state, { booking }) => {
        return {
            ...state,
            success: ADD_BOOKING,
            loading: false
        };
    }),
    on(RestrauntActions.updateBookingSuccess, (state, { booking }) => {
        return {
            ...state,
            success: BOOKING_UPDATED,
            loading: false
        };
    }),
    on(RestrauntActions.deleteBookingSuccess, (state, { id }) => {
        return {
            ...state,
            success: BOOKING_DELETED,
            loading: false
        };
    }),
    on(RestrauntActions.loadBookingFailure, RestrauntActions.addBookingFailure,
        RestrauntActions.updateBookingFailure, RestrauntActions.deleteBookingFailure,
        (state, { error }) => ({
            ...state,
            error: error,
            loading: false
        }
        )),
    on(RestrauntActions.resetSuccessMessage, (state) => ({
        ...state,
        success: null
    }))
);
