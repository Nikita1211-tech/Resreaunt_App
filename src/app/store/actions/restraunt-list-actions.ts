import { createAction, props } from "@ngrx/store";
import { ADD_APPOINTMENT, ADD_APPOINTMENT_FAILURE, ADD_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT, DELETE_APPOINTMENT_FAILURE, DELETE_APPOINTMENT_SUCCESS, LOAD_APPOINTMENT, LOAD_APPOINTMENT_SUCCESS, LOAD_RESTRAUNT, LOAD_RESTRAUNT_FAILURE, LOAD_RESTRAUNT_SUCCESS, UPDATE_APPOINTMENT, UPDATE_APPOINTMENT_FAILURE, UPDATE_APPOINTMENT_SUCCESS } from "../../enum/state-enum";
import { formData, Restraunt } from "../../interfaces/restraunt.interface";

// Loads restraunt list  
export const loadRestraunt = createAction(LOAD_RESTRAUNT);
export const loadRestrauntSuccess = createAction(LOAD_RESTRAUNT_SUCCESS, props<{ restraunts: Restraunt[] }>());
export const loadRestrauntFailure = createAction(LOAD_RESTRAUNT_FAILURE, props<{ error: string }>());

// Loads appointment list 
export const loadBookingAppointment = createAction(LOAD_APPOINTMENT);
export const loadBookingAppointmentSuccess = createAction(LOAD_APPOINTMENT_SUCCESS, props<{ appointments: formData[] }>());
export const loadBookingAppointmentFailure = createAction(LOAD_RESTRAUNT_FAILURE, props<{ error: string }>());

// Adds appointment in appointment list 
export const addBookingAppointment = createAction(ADD_APPOINTMENT, props<{ appointments: formData[] }>());
export const addBookingAppointmentSuccess = createAction(ADD_APPOINTMENT_SUCCESS, props<{ appointments: formData[] }>());
export const addBookingAppointmentFailure = createAction(ADD_APPOINTMENT_FAILURE, props<{ error: string }>());

// Deletes appointment in appointment list 
export const deleteBookedAppointment = createAction(DELETE_APPOINTMENT, props<{ id: number }>());
export const deleteBookedAppointmentSuccess = createAction(DELETE_APPOINTMENT_SUCCESS, props<{ id: number }>());
export const deleteBookedAppointmentFailure = createAction(DELETE_APPOINTMENT_FAILURE, props<{ error: string }>());

// Updates appointment in appointment list 
export const updateBookedAppointment = createAction(UPDATE_APPOINTMENT, props<{ appointment: formData }>());
export const updateBookedAppointmentSuccess = createAction(UPDATE_APPOINTMENT_SUCCESS, props<{ appointment: formData }>());
export const updateBookedAppointmentFailure = createAction(UPDATE_APPOINTMENT_FAILURE, props<{ error: string }>());
