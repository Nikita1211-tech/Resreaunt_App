import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppointmentState, RestrauntState } from "../reducers/restraunt-list-reducers";

// Selector of restraunt list 
export const selectRestrauntFeature = createFeatureSelector<RestrauntState>('restraunts');

export const selectAllRestraunt = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.restraunts
)

export const selectRestrauntError = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.error
)

// Selector of appointment list
export const selectAppointmentFeature = createFeatureSelector<AppointmentState>('appointments');

export const selectAppointments = createSelector(
  selectAppointmentFeature,
  (state: AppointmentState) => state.appointments
);

export const selectAppointmentError = createSelector(
  selectAppointmentFeature,
  (state: AppointmentState) => state.error
);