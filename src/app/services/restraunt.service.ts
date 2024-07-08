import { Injectable } from '@angular/core';
import { formData, Restraunt } from '../interfaces/restraunt.interface';
import { Observable, of } from 'rxjs';
import { appointmentListKey, restrauntListKey } from '../enum/localStorage-enum';
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
      tableType: [1, 2, 4, 6],
      availableSeats: 4
    },
    {
      id: 2,
      name: "Burger Singh",
      img: "./../../assets/images/rest_2.jpg",
      tableType: [1, 2, 4, 6],
      availableSeats: 4
    },
    {
      id: 3,
      name: "Panthouse Pizza",
      img: "./../../assets/images/rest_3.jpg",
      tableType: [1, 2, 4, 6],
      availableSeats: 4
    },
    {
      id: 4,
      name: "Steuber's",
      img: "./../../assets/images/rest_4.jpg",
      tableType: [1, 2, 4, 6],
      availableSeats: 4
    }
  ]

  // Sets restraunt list on localStorage 
  setRestrauntList(): Observable<Restraunt[]> {
    localStorage.setItem(restrauntListKey, JSON.stringify(this.restrauntList));
    return of(this.restrauntList);
  }

  // Fetches appointment list from localStorage 
  getAppointmentList(): Observable<formData[]> {
    let parsedAppointmentData: formData[] = [];
    let appointmentData = localStorage.getItem(appointmentListKey);
    if (appointmentData) {
      parsedAppointmentData = JSON.parse(appointmentData);
    }
    return of(parsedAppointmentData);
  }

  // Adds appointment list and resets the appointmwntList data in localStorage 
  addAppointment(formData: formData[]): Observable<formData[]> {
    localStorage.setItem(appointmentListKey, JSON.stringify(formData));
    return of(formData);
  }

  // Deletes appointment list and resets the appointmwntList data in localStorage 
  deleteAppointment(formData: formData[]): Observable<formData[]> {
    localStorage.setItem(appointmentListKey, JSON.stringify(formData));
    return of(formData);
  }

  // Updates appointment list and resets the appointmwntList data in localStorage 
  updateAppointment(formData: formData[]): Observable<formData[]> {
    localStorage.setItem(appointmentListKey, JSON.stringify(formData));
    return of(formData);
  }

  // Opens toast message 
  openToastSuccess(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
