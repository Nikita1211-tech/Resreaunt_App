import { Component, OnInit } from '@angular/core';
import { Appointment, Restraunt } from '../../interfaces/restraunt.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RestrauntActions from './../../store/actions/restraunt-list-actions';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ACTION, APPOINTMENT_ADDED, APPOINTMENT_UPDATED_SUCCESSFULLY, appointmentListKey, NO_APPOINTMENT_AVAILABLE } from '../../enum/localStorage-enum';
import { RestrauntService } from '../../services/restraunt.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-restraunt',
  templateUrl: './book-restraunt.component.html',
  styleUrl: './book-restraunt.component.css',
})
export class BookRestrauntComponent implements OnInit {
  restrauntForm: FormGroup;
  restrauntId!: number;
  appointmentId!: number;
  bookingList$!: Observable<Appointment[]>;
  restrauntList$!: Observable<Restraunt[]>;
  restrauntName!: string;
  tableSize!: number[];
  tableLocation!: string[];
  timeSlot!: string[];
  storedAppointments: Appointment[] = [];
  alreadyExists: boolean = false;
  timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>'
  minDate!: Date;
  maxDate!: Date;
  bookingId!: number;

  constructor(private route: ActivatedRoute, private store: Store,
    private router: Router, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
    private restrauntService: RestrauntService) {
    this.restrauntForm = new FormGroup({
      tableSize: new FormControl('', Validators.required),
      tableLoc: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
    this.iconRegistry.addSvgIconLiteral('time-icon', this.sanitizer.bypassSecurityTrustHtml(this.timeIcon));
  }

  ngOnInit(): void {
    this.restrauntId = Number(this.route.snapshot.params['id']);
    this.bookingId = Number(this.route.snapshot.queryParams['bookingId']);
    this.bookingList$ = this.store.select(RestrauntSelectors.selectAllAppointments);
    this.restrauntList$ = this.store.select(RestrauntSelectors.selectAllRestraunt);

    // Date Validator 
    this.minDate = new Date();

    // Set maxDate to one month from today's date
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    this.maxDate = maxDate;

    // Filters restraunt name according to id 
    this.restrauntList$.subscribe((value) => {
      if (value) {
        const filteredRestrauntList = value.find(item => item.id === this.restrauntId);
        if (filteredRestrauntList) {
          this.restrauntName = filteredRestrauntList.name;
          this.tableSize = filteredRestrauntList.tableSize;
          this.tableLocation = filteredRestrauntList.tableLocation;
          this.timeSlot = filteredRestrauntList.timeSlot;
        }
      }
    });

    // Fetches appointment list and assigning id to newly added appointment
    this.bookingList$.subscribe((value) => {
      this.storedAppointments = value;
      const filteredRestrauntFormValues = value.find(item => item.id === this.bookingId);
      console.log(filteredRestrauntFormValues);
      if (filteredRestrauntFormValues) {
        this.restrauntName = filteredRestrauntFormValues.restrauntName;
        this.restrauntForm.patchValue({
          tableSize: filteredRestrauntFormValues.tableSize,
          tableLoc: filteredRestrauntFormValues.tableLoc,
          date: new Date(filteredRestrauntFormValues.date),
          time: filteredRestrauntFormValues.time
        })
      };
      if (!this.bookingId && this.storedAppointments.length > 0) {
        this.appointmentId = this.storedAppointments.length + 1;
        this.storedAppointments.find((value) => {
          if (this.appointmentId === value.id) {
            this.appointmentId = this.storedAppointments.length + 2;
          }
        })
      }
      else {
        this.appointmentId = 1;
      };
    });
  }

  // Dispatches action 
  addAppointment(newAppointment: Appointment[]): void {
    this.store.dispatch(RestrauntActions.addBookingAppointment({ appointments: newAppointment }));
    this.router.navigate(['restraunt/BookStatus']);
    this.restrauntService.openToastSuccess(APPOINTMENT_ADDED, ACTION);
  }

  // Submits form data 
  onSave(): void {
    if (this.restrauntForm.invalid) {
      return;
    }
    else {
      const restrauntFormValues = this.restrauntForm.value;
      if (this.bookingId) {
        const updatedAppointment: Appointment = {
          id: this.bookingId,
          restrauntId: this.restrauntId,
          restrauntName: this.restrauntName,
          tableSize: restrauntFormValues.tableSize,
          tableLoc: restrauntFormValues.tableLoc,
          date: restrauntFormValues.date,
          time: restrauntFormValues.time
        }
        this.store.dispatch(RestrauntActions.updateBookedAppointment({ appointment: updatedAppointment }));
        this.restrauntService.openToastSuccess(APPOINTMENT_UPDATED_SUCCESSFULLY, ACTION);
        this.router.navigate(['/restraunt/BookStatus']);
      }
      else {
        let newAppointment: Appointment[] = [] 
        newAppointment.push({
            id: this.appointmentId,
            restrauntId: this.restrauntId,
            restrauntName: this.restrauntName,
            tableSize: restrauntFormValues.tableSize,
            tableLoc: restrauntFormValues.tableLoc,
            date: restrauntFormValues.date,
            time: restrauntFormValues.time
        })
        if (this.storedAppointments.length > 0) {
          for (let i = 0; i < this.storedAppointments.length; i++) {
            if (this.storedAppointments[i].tableSize === restrauntFormValues.tableSize && this.storedAppointments[i].date === restrauntFormValues.date
              && this.storedAppointments[i].time === restrauntFormValues.time) {
              this.restrauntService.openToastSuccess(NO_APPOINTMENT_AVAILABLE, ACTION);
              this.alreadyExists = true;
            }
          }
          if (this.alreadyExists === false) {
            this.addAppointment(newAppointment);
            this.storedAppointments = [...this.storedAppointments, ...newAppointment];
          }
          else {
            this.alreadyExists = false;
          }
        }
        else {
          this.addAppointment(newAppointment);
        }
      }
    }
  }
}
