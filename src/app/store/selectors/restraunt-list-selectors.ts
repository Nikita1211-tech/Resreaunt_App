import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../reducers/restraunt-list-reducers";

// Selector of restraunt list 
export const selectRestrauntFeature = createFeatureSelector<AppState>('app');

export const selectAllRestraunt = createSelector(
  selectRestrauntFeature,
  (state: AppState) => state.restraunts
)

export const selectAppointments = createSelector(
  selectRestrauntFeature,
  (state: AppState) => state.appointments
);

export const selectRestrauntError = createSelector(
  selectRestrauntFeature,
  (state: AppState) => state.error
)