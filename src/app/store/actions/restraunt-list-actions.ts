import { createAction, props } from "@ngrx/store";
import { LOAD_APPOINTMENT, LOAD_APPOINTMENT_FAILURE, LOAD_APPOINTMENT_SUCCESS, LOAD_RESTRAUNT, LOAD_RESTRAUNT_FAILURE, LOAD_RESTRAUNT_SUCCESS } from "../../enum/state-enum";
import { Restraunt } from "../../interfaces/restraunt.interface";

// Restraunt loading list actions 
export const loadRestraunt = createAction(LOAD_RESTRAUNT);
export const loadRestrauntSuccess = createAction(LOAD_RESTRAUNT_SUCCESS, props<{restraunts: Restraunt[]}>());
export const loadRestrauntFailure = createAction(LOAD_RESTRAUNT_FAILURE, props<{error: string}>());

// Appointment list actions 
export const loadAppointment = createAction(LOAD_APPOINTMENT);
export const loadAppointmentSuccess = createAction(LOAD_APPOINTMENT_SUCCESS, props<{restraunts: Restraunt[]}>());
export const loadAppointmentFailure = createAction(LOAD_APPOINTMENT_FAILURE, props<{error: string}>);