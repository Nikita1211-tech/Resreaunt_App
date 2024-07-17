import { createReducer, on } from "@ngrx/store";
import { Booking } from "../../interfaces/restraunt.interface";
import * as RestrauntActions from './../actions/restraunt-list-actions';
import { BOOKING_ADDED, BOOKING_DELETED, BOOKING_UPDATED, bookingListKey } from "../../enum/localStorage-enum";

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
    on(RestrauntActions.addBookingSuccess, (state, { bookings }) => {
        const newBooking = [...state.bookings, bookings];
        localStorage.setItem(bookingListKey, JSON.stringify(newBooking));
        return {
            ...state,
            bookings: newBooking,
            success: BOOKING_ADDED,
            loading: false
        };
    }),
    on(RestrauntActions.updateBookingSuccess, (state, { booking }) => {
        const updatedBooking = state.bookings.map((item) => {
            if (item.id === booking.id) {
                return {
                    ...item,
                    ...booking
                };
            }
            return item;
        });
        localStorage.setItem(bookingListKey, JSON.stringify(updatedBooking));
        return {
            ...state,
            bookings: updatedBooking,
            success: BOOKING_UPDATED,
            loading: false
        };
    }),
    on(RestrauntActions.deleteBookingSuccess, (state, { id }) => {
        const notDeletedBooking = state.bookings.filter(booking => booking.id !== id);
        localStorage.setItem(bookingListKey, JSON.stringify(notDeletedBooking));
        return {
            ...state,
            bookings: notDeletedBooking,
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
