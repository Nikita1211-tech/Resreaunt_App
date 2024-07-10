import { createAction, props } from "@ngrx/store";
import { ADD_APPOINTMENT, ADD_APPOINTMENT_FAILURE, ADD_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT, DELETE_APPOINTMENT_FAILURE, DELETE_APPOINTMENT_SUCCESS, LOAD_APPOINTMENT, LOAD_APPOINTMENT_SUCCESS, LOAD_RESTRAUNT, LOAD_RESTRAUNT_FAILURE, LOAD_RESTRAUNT_SUCCESS, LOAD_SPINNER, LOAD_SPINNER_FAILURE, LOAD_SPINNER_SUCCESS, UPDATE_APPOINTMENT, UPDATE_APPOINTMENT_FAILURE, UPDATE_APPOINTMENT_SUCCESS } from "../../enum/state-enum";
import { Appointment, Restraunt } from "../../interfaces/restraunt.interface";

// Loads spinner 
export const loadSpinner = createAction(LOAD_SPINNER, props<{ isLoading: boolean }>());
export const loadSpinnerSuccess = createAction(LOAD_SPINNER_SUCCESS, props<{ isLoading: boolean }>());
export const loadSpinnerFailure = createAction(LOAD_SPINNER_FAILURE, props<{ error: string }>());

// Loads restraunt list  
export const loadRestraunt = createAction(LOAD_RESTRAUNT);
export const loadRestrauntSuccess = createAction(LOAD_RESTRAUNT_SUCCESS, props<{ restraunts: Restraunt[] }>());
export const loadRestrauntFailure = createAction(LOAD_RESTRAUNT_FAILURE, props<{ error: string }>());

// Loads appointment list 
export const loadBookingAppointment = createAction(LOAD_APPOINTMENT);
export const loadBookingAppointmentSuccess = createAction(LOAD_APPOINTMENT_SUCCESS, props<{ appointments: Appointment[] }>());
export const loadBookingAppointmentFailure = createAction(LOAD_RESTRAUNT_FAILURE, props<{ error: string }>());

// Adds appointment in appointment list 
export const addBookingAppointment = createAction(ADD_APPOINTMENT, props<{ appointments: Appointment[] }>());
export const addBookingAppointmentSuccess = createAction(ADD_APPOINTMENT_SUCCESS, props<{ appointments: Appointment[] }>());
export const addBookingAppointmentFailure = createAction(ADD_APPOINTMENT_FAILURE, props<{ error: string }>());

// Deletes appointment in appointment list 
export const deleteBookedAppointment = createAction(DELETE_APPOINTMENT, props<{ id: number }>());
export const deleteBookedAppointmentSuccess = createAction(DELETE_APPOINTMENT_SUCCESS, props<{ id: number }>());
export const deleteBookedAppointmentFailure = createAction(DELETE_APPOINTMENT_FAILURE, props<{ error: string }>());

// Updates appointment in appointment list 
export const updateBookedAppointment = createAction(UPDATE_APPOINTMENT, props<{ appointment: Appointment }>());
export const updateBookedAppointmentSuccess = createAction(UPDATE_APPOINTMENT_SUCCESS, props<{ appointment: Appointment }>());
export const updateBookedAppointmentFailure = createAction(UPDATE_APPOINTMENT_FAILURE, props<{ error: string }>());
