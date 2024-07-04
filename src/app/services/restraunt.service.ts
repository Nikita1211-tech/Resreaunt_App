import { Injectable } from '@angular/core';
import { Restraunt } from '../interfaces/restraunt.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestrauntService {

  constructor() { }

  restrauntList: Restraunt[] = [
    {
      id: 1,
      name: "Aqua Kyota",
      img: "./../../assets/images/rest_1.jpg",
      tableType: [1,2,4,6],
      availableSeats:  4
    },
    {
      id: 2,
      name: "Burger Singh",
      img: "./../../assets/images/rest_2.jpg",
      tableType: [1,2,4,6],
      availableSeats:  4
    },
    {
      id: 3,
      name: "Panthouse Pizza",
      img: "./../../assets/images/rest_3.jpg",
      tableType: [1,2,4,6],
      availableSeats:  4
    },
    {
      id: 4,
      name: "Steuber's",
      img: "./../../assets/images/rest_4.jpg",
      tableType: [1,2,4,6],
      availableSeats:  4
    }
  ]

  getRestrauntList(): Observable<Restraunt[]> {
    return of(this.restrauntList);
  }
}
