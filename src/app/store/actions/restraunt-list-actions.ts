import { createAction, props } from "@ngrx/store";
import {
    ADD_BOOKING, ADD_BOOKING_FAILURE, ADD_BOOKING_SUCCESS, DELETE_BOOKING, DELETE_BOOKING_FAILURE,
    DELETE_BOOKING_SUCCESS, LOAD_BOOKING, LOAD_BOOKING_FAILURE, LOAD_BOOKING_SUCCESS, LOAD_RESTRAUNT,
    LOAD_RESTRAUNT_FAILURE, LOAD_RESTRAUNT_SUCCESS, LOAD_SPINNER, RESET_SUCCESS, UPDATE_BOOKING,
    UPDATE_BOOKING_FAILURE, UPDATE_BOOKING_SUCCESS
} from "../../enum/state-enum";
import { Booking, Restraunt } from "../../interfaces/restraunt.interface";

// Loads spinner 
export const loadSpinner = createAction(LOAD_SPINNER, props<{ isLoading: boolean }>());

// Loads restraunt list  
export const loadRestraunt = createAction(LOAD_RESTRAUNT);
export const loadRestrauntSuccess = createAction(LOAD_RESTRAUNT_SUCCESS, props<{ restraunts: Restraunt[] }>());
export const loadRestrauntFailure = createAction(LOAD_RESTRAUNT_FAILURE, props<{ error: string }>());

// Loads booking list actions
export const loadBooking = createAction(LOAD_BOOKING);
export const loadBookingSuccess = createAction(LOAD_BOOKING_SUCCESS, props<{ booking: Booking[] }>());
export const loadBookingFailure = createAction(LOAD_BOOKING_FAILURE, props<{ error: string }>());

// Booking list add action 
export const addBooking = createAction(ADD_BOOKING, props<{ bookings: Booking[] }>());
export const addBookingSuccess = createAction(ADD_BOOKING_SUCCESS, props<{ bookings: Booking[] }>());
export const addBookingFailure = createAction(ADD_BOOKING_FAILURE, props<{ error: string }>());

// Booking list delete action  
export const deleteBooking = createAction(DELETE_BOOKING, props<{ id: number }>());
export const deleteBookingSuccess = createAction(DELETE_BOOKING_SUCCESS, props<{ id: number }>());
export const deleteBookingFailure = createAction(DELETE_BOOKING_FAILURE, props<{ error: string }>());

// Booking list update action 
export const updateBooking = createAction(UPDATE_BOOKING, props<{ booking: Booking }>());
export const updateBookingSuccess = createAction(UPDATE_BOOKING_SUCCESS, props<{ booking: Booking }>());
export const updateBookingFailure = createAction(UPDATE_BOOKING_FAILURE, props<{ error: string }>());

// Resets success message action
export const resetSuccessMessage = createAction(RESET_SUCCESS);
