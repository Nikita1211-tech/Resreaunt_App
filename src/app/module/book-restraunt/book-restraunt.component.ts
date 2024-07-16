import { Component, OnInit } from '@angular/core';
import { Booking, Restraunt } from '../../interfaces/restraunt.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RestrauntActions from './../../store/actions/restraunt-list-actions';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import * as BookingSelectors from './../../store/selectors/booking-list-selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ACTION, BOOKING_ADDED, BOOKING_UPDATED, NO_BOOKING_AVAILABLE } from '../../enum/localStorage-enum';
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
  restrauntList$!: Observable<Restraunt[]>;
  restrauntDetails = <Restraunt>{};
  storedBookingList: Booking[] = [];
  timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>'
  minDate!: Date;
  maxDate!: Date;
  bookingId!: number;

  constructor(private route: ActivatedRoute, private store: Store, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer, private restrauntService: RestrauntService, private router: Router) {
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
    this.restrauntList$ = this.store.select(RestrauntSelectors.selectAllRestraunt);

    // Date Validator 
    this.minDate = new Date();

    // Set maxDate to one month from today's date
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    this.maxDate = maxDate;

    // Filters restraunt name according to id and used in mat checkbox for providing options
    this.restrauntList$.subscribe((value) => {
      if (value) {
        const currentRestrauntList = value.find(item => item.id === this.restrauntId);
        if (currentRestrauntList) {
          this.restrauntDetails.restrauntName = currentRestrauntList.restrauntName;
          this.restrauntDetails.tableSize = currentRestrauntList.tableSize;
          this.restrauntDetails.tableLocation = currentRestrauntList.tableLocation;
          this.restrauntDetails.timeSlot = currentRestrauntList.timeSlot;
        }
      }
    });

    // Fetches booking list and assigns id to recently added booking
    this.store.select(BookingSelectors.selectAllBookings).subscribe((value) => {
      this.storedBookingList = value;
      const currentBookingList = value.find(item => item.id === this.bookingId);
      if (!this.bookingId && this.storedBookingList.length > 0) {
        this.appointmentId = this.storedBookingList.length + 1;
        const duplicateAppointmentId = this.storedBookingList.find((value) => (value.id === this.appointmentId));
        if (duplicateAppointmentId) {
          this.appointmentId = this.storedBookingList.length + 2;
        }
      }
      else {
        this.appointmentId = 1;
      };

      // Prefill form value according to bookingId
      if (currentBookingList) {
        this.restrauntForm.patchValue({
          tableSize: currentBookingList.tableSize,
          tableLoc: currentBookingList.tableLoc,
          date: new Date(currentBookingList.date),
          time: currentBookingList.time
        })
      };
    });

    // Handles success case 
    this.successHandler();
  }

  // Submits form data 
  onSave(): void {
    if (this.restrauntForm.invalid) {
      return;
    }
    else {
      const restrauntFormValues = this.restrauntForm.value;
      // Checks whether bookingId is present in params or not 
      if (this.bookingId) {
        const updatedBooking: Booking = {
          id: this.bookingId,
          restrauntId: this.restrauntId,
          restrauntName: this.restrauntDetails.restrauntName,
          tableSize: restrauntFormValues.tableSize,
          tableLoc: restrauntFormValues.tableLoc,
          date: formatDate(restrauntFormValues.date, 'MM/dd/yyyy', 'en'),
          time: restrauntFormValues.time
        }
        this.store.dispatch(RestrauntActions.updateBooking({ booking: updatedBooking }));
      }
      else {
        let alreadyExists: boolean = false;
        const newBooking: Booking[] = [];
        const date = formatDate(restrauntFormValues.date, 'MM/dd/yyyy', 'en');
        newBooking.push({
          id: this.appointmentId,
          restrauntId: this.restrauntId,
          restrauntName: this.restrauntDetails.restrauntName,
          tableSize: restrauntFormValues.tableSize,
          tableLoc: restrauntFormValues.tableLoc,
          date: date,
          time: restrauntFormValues.time
        });

        // Checks whether past bookings are present in list or not 
        if (this.storedBookingList.length > 0) {
          for (let i = 0; i < this.storedBookingList.length; i++) {
            if (this.storedBookingList[i].tableSize === restrauntFormValues.tableSize && this.storedBookingList[i].date === date
              && this.storedBookingList[i].time === restrauntFormValues.time) {
              this.restrauntService.openToastSuccess(NO_BOOKING_AVAILABLE, ACTION);
              alreadyExists = true;
              return;
            }
          }
          if (!alreadyExists) {
            this.addBooking(newBooking);
          }
        }
        else {
          this.addBooking(newBooking);
        }
      }
    }
  }

  // Dispatches add book action 
  addBooking(newBooking: Booking[]): void {
    this.store.dispatch(RestrauntActions.addBooking({ bookings: newBooking }));
  }

  successHandler(): void {
    this.store.select(BookingSelectors.selectBookingSuccess).subscribe((success) => {
      if (success?.length) {
        switch (success) {
          case BOOKING_ADDED:
            this.router.navigate(['restraunt/Bookings']);
            this.restrauntService.openToastSuccess(BOOKING_ADDED, ACTION);
            this.store.dispatch(RestrauntActions.resetSuccessMessage());
            return;
          case BOOKING_UPDATED:
            this.router.navigate(['restraunt/Bookings']);
            this.restrauntService.openToastSuccess(BOOKING_UPDATED, ACTION);
            this.store.dispatch(RestrauntActions.resetSuccessMessage());
            return;
          default:
            return;
        }
      }
    });
  }
}
