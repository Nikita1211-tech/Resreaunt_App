import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RestrauntState } from "../reducers/restraunt-list-reducers";

// Selector of restraunt list 
export const selectRestrauntFeature = createFeatureSelector<RestrauntState>('restraunt');

export const selectAllRestraunt = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.restraunts
);

export const selectRestrauntError = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.error
);