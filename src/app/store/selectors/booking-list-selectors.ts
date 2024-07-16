import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingState } from "../reducers/booking-list-reducers";

// Selector of booking list 
export const selectBookingFeature = createFeatureSelector<BookingState>('booking');

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
  selectBookingFeature,
  (state: BookingState) => state.loading
)