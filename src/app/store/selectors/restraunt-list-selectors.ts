import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RestrauntState } from "../reducers/restraunt-list-reducers";

export const selectCategoryFeature = createFeatureSelector<RestrauntState>('restraunts');

export const selectAllRestraunt =  createSelector(
    selectCategoryFeature,
    (state: RestrauntState) =>  state.restraunts
)

export const selectRestrauntError = createSelector(
    selectCategoryFeature,
    (state: RestrauntState) => state.error
)