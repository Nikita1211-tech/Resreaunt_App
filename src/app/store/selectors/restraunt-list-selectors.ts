import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppointmentState, RestrauntState } from "../reducers/restraunt-list-reducers";

// Selector of restraunt list 
export const selectRestrauntFeature = createFeatureSelector<RestrauntState>('restraunt');
export const selectAppointmentFeature = createFeatureSelector<AppointmentState>('appointment');

export const selectAllRestraunt = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.restraunts
);

export const selectRestrauntError = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.error
);

export const selectAllAppointments = createSelector(
  selectAppointmentFeature,
  (state: AppointmentState) => state.appointments
);

export const selectLoader = createSelector(
  selectAppointmentFeature, selectRestrauntFeature,
  (state: AppointmentState) => state.loading
)

export const selectAppointmentError = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.error
);
