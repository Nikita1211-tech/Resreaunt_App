import { Injectable } from '@angular/core';
import { Booking, Restraunt } from '../interfaces/restraunt.interface';
import { Observable, of } from 'rxjs';
import { bookingListKey } from '../enum/localStorage-enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RestrauntService {

  constructor(private snackBar: MatSnackBar) { }

  restrauntList: Restraunt[] = [
    {
      id: 1,
      restrauntName: "Aqua Kyota",
      img: "./../../assets/images/rest_1.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['11:00 am - 01:00 pm', '01:00 pm - 03:00 pm', '03:00 pm - 05:00 pm', '07:00 pm - 09:00 pm']
    },
    {
      id: 2,
      restrauntName: "Burger Singh",
      img: "./../../assets/images/rest_2.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['09:00 am - 11:00 am', '01:00 pm - 02:00 pm', '03:00 pm - 05:00 pm', '08:00 pm - 10:00 pm']
    },
    {
      id: 3,
      restrauntName: "Panthouse Pizza",
      img: "./../../assets/images/rest_3.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['10:00 am - 11:30 am', '12:30 pm - 01:30 pm', '03:00 pm - 05:00 pm', '07:00 pm - 08:30 pm']
    },
    {
      id: 4,
      restrauntName: "Steuber's",
      img: "./../../assets/images/rest_4.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['09:00 am - 11:00 am', '02:00 pm - 04:00 pm', '06:00 pm - 08:00 pm', '09:00 pm - 11:00 pm']
    }
  ]

  // Sets restraunt list on localStorage 
  getRestrauntList(): Observable<Restraunt[]> {
    return of(this.restrauntList);
  }

  // Fetches booking list from localStorage 
  getBookingList(): Observable<Booking[]> {
    let parsedBookingData: Booking[] = [];
    let bookingData = localStorage.getItem(bookingListKey);
    if (bookingData) {
      parsedBookingData = JSON.parse(bookingData);
    }
    return of(parsedBookingData);
  }

  // Adds new booking in booking list
  addBooking(newBooking: Booking[]): Observable<Booking[]> {
    return of(newBooking);
  }

  // Deletes booking by id from booking list
  deleteBooking(id: number): Observable<number> {
    return of(id);
  }

  // Updates booking by id in booking list
  updateBooking(updatedBooking: Booking): Observable<Booking> {
    return of(updatedBooking);
  }

  // Opens toast message 
  openToastSuccess(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
