import { Injectable } from '@angular/core';
import { Booking, Restraunt } from '../interfaces/restraunt.interface';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ADD_RESTAURANT_BOOKING, DELETE_RESTAURANT_BOOKING, GET_BOOKING_LIST, GET_RESTAURANT_LIST, UPDATE_RESTAURANT_BOOKING } from '../constants/route-constant';

@Injectable({
  providedIn: 'root'
})
export class RestrauntService {
  private API_URL = environment.API_URL + '/restaurant';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  // Sets restraunt list on localStorage 
  getRestrauntList(): Observable<Restraunt[]> {
    return this.http.get<Restraunt[]>(this.API_URL + GET_RESTAURANT_LIST);
  }

  // Fetches booking list from localStorage 
  getBookingList(): Observable<Booking[]> {
   return this.http.get<Booking[]>(this.API_URL + GET_BOOKING_LIST);
  }

  // Adds new booking in booking list
  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.API_URL + ADD_RESTAURANT_BOOKING, newBooking);
  }

  // Deletes booking by id from booking list
  deleteBooking(id: number): Observable<number> {
    return this.http.delete<number>(this.API_URL + DELETE_RESTAURANT_BOOKING + `/${id}`);
  }

  // Updates booking by id in booking list
  updateBooking(updatedBooking: Booking): Observable<Booking> {
    return this.http.put<Booking>(this.API_URL + UPDATE_RESTAURANT_BOOKING, updatedBooking);
  }

  // Opens toast message 
  openToastSuccess(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
