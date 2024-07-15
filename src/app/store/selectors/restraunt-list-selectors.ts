import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingState, RestrauntState } from "../reducers/restraunt-list-reducers";

// Selector of restraunt list 
export const selectRestrauntFeature = createFeatureSelector<RestrauntState>('restraunt');
export const selectBookingFeature = createFeatureSelector<BookingState>('booking');

export const selectAllRestraunt = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.restraunts
);

export const selectRestrauntError = createSelector(
  selectRestrauntFeature,
  (state: RestrauntState) => state.error
);

export const selectAllBookings = createSelector(
  selectBookingFeature,
  (state: BookingState) => state.bookings
);

export const selectBookingSuccess = createSelector(
  selectBookingFeature,
  (state: BookingState) => state.success
);

export const selectBookingError = createSelector(
  selectBookingFeature,
  (state: BookingState) => state.error
);

export const selectLoader = createSelector(
  selectBookingFeature, selectRestrauntFeature,
  (state: BookingState) => state.loading
)