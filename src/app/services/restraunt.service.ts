import { Injectable } from '@angular/core';
import { Appointment, Restraunt } from '../interfaces/restraunt.interface';
import { delay, Observable, of } from 'rxjs';
import { appointmentListKey } from '../enum/localStorage-enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RestrauntService {

  constructor(private snackBar: MatSnackBar) { }

  restrauntList: Restraunt[] = [
    {
      id: 1,
      name: "Aqua Kyota",
      img: "./../../assets/images/rest_1.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['12:00 pm', '01:00 pm', '03:00 pm', '07:00 pm']
    },
    {
      id: 2,
      name: "Burger Singh",
      img: "./../../assets/images/rest_2.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['12:00 pm', '01:00 pm', '03:00 pm', '07:00 pm']
    },
    {
      id: 3,
      name: "Panthouse Pizza",
      img: "./../../assets/images/rest_3.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['12:00 pm', '01:00 pm', '03:00 pm', '07:00 pm']
    },
    {
      id: 4,
      name: "Steuber's",
      img: "./../../assets/images/rest_4.jpg",
      tableSize: [1, 2, 4, 6],
      tableLocation: ['Left', 'Right', 'Center'],
      timeSlot: ['12:00 pm', '01:00 pm', '03:00 pm', '07:00 pm']
    }
  ]

  // Sets restraunt list on localStorage 
  getRestrauntList(): Observable<Restraunt[]> {
    return of(this.restrauntList);
  }

  // Fetches appointment list from localStorage 
  getAppointmentList(): Observable<Appointment[]> {
    let parsedAppointmentData: Appointment[] = [];
    let appointmentData = localStorage.getItem(appointmentListKey);
    if (appointmentData) {
      parsedAppointmentData = JSON.parse(appointmentData);
    }
    return of(parsedAppointmentData);
  }

  // Adds appointment list and resets the appointmwntList data in localStorage 
  addAppointment(newAppointment: Appointment[]): Observable<Appointment[]> {
    return of(newAppointment);
  }

  // Deletes appointment list and resets the appointmwntList data in localStorage 
  deleteAppointment(id: number): Observable<number> {
    return of(id);
  }

  // Updates appointment list and resets the appointmentList data in localStorage 
  updateAppointment(updatedAppointment: Appointment): Observable<Appointment> {
    return of(updatedAppointment);
  }

  // Opens toast message 
  openToastSuccess(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
