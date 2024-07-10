import { Component, OnInit } from '@angular/core';
import { Appointment, Restraunt } from '../../interfaces/restraunt.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RestrauntActions from './../../store/actions/restraunt-list-actions';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ACTION, APPOINTMENT_ADDED, appointmentListKey, NO_APPOINTMENT_AVAILABLE } from '../../enum/localStorage-enum';
import { RestrauntService } from '../../services/restraunt.service';

@Component({
  selector: 'app-book-restraunt',
  templateUrl: './book-restraunt.component.html',
  styleUrl: './book-restraunt.component.css',
  providers: [DatePipe]
})
export class BookRestrauntComponent implements OnInit {
  restrauntForm: FormGroup;
  id!: string;
  appointmentId!: number;
  formData$!: Observable<Appointment[]>;
  restrauntList$!: Observable<Restraunt[]>;
  restrauntName!: string;
  filteredRestrauntNameList!: Restraunt[];
  storedAppointments: Appointment[] = [];
  tableType: number[] = [1, 2, 4, 6];
  seatLocation: string[] = ['Left', 'Right', 'Center'];
  timeSlot: string[] = ['12:00 pm', '01:00 pm', '03:00 pm', '07:00 pm'];
  date!: string;
  alreadyExists: boolean = false;
  timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>'
  minDate!: Date;
  maxDate!: Date;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private store: Store,
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
    this.id = this.route.snapshot.params['id'];
    this.formData$ = this.store.select(RestrauntSelectors.selectAllAppointments);
    this.restrauntList$ = this.store.select(RestrauntSelectors.selectAllRestraunt);

    // Filters restraunt name according to id 
    this.restrauntList$.forEach(value => {
      this.filteredRestrauntNameList = value.filter(item => item.id === Number(this.id));
      this.restrauntName = this.filteredRestrauntNameList[0].name;
    });

    this.appointmentId = this.storedAppointments.length + 1;
    // Fetches appointment list and assigning id to newly added appointment
    this.formData$.subscribe((value) => {
      this.storedAppointments = value;
      this.storedAppointments.forEach((value) => {
        if (this.appointmentId === value.id) {
          this.appointmentId = this.storedAppointments.length + 2;
        }
      });
    });

    // Date Validator 
    this.minDate = new Date();

    // Set maxDate to one month from today's date
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    this.maxDate = maxDate;
  }

  // Submits form data 
  onSubmit(): void {
    if (this.restrauntForm.invalid) {
      return;
    }
    else {
      let tableSize = this.restrauntForm.get('tableSize')?.value;
      let tableLoc = this.restrauntForm.get('tableLoc')?.value;
      let time = this.restrauntForm.get('time')?.value
      let updatedDate = this.datePipe.transform(this.restrauntForm.get('date')?.value, 'MM-dd-yyyy');
      if (updatedDate) {
        this.date = updatedDate;
      }
      let newAppointment: Appointment[] = [];
      newAppointment.push({
        id: this.appointmentId,
        restrauntId: Number(this.id),
        restrauntName: this.restrauntName,
        tableSize: tableSize,
        tableLoc: tableLoc,
        date: this.date,
        time: time
      });
      if (this.storedAppointments.length > 0) {
        for (let i = 0; i < this.storedAppointments.length; i++) {
          if (this.storedAppointments[i].tableSize === tableSize && this.storedAppointments[i].date === this.date
            && this.storedAppointments[i].time === time) {
            this.restrauntService.openToastSuccess(NO_APPOINTMENT_AVAILABLE, ACTION);
            this.alreadyExists = true;
          }
        }
        if (this.alreadyExists === false) {
          this.store.dispatch(RestrauntActions.addBookingAppointment({ appointments: newAppointment }));
          console.log(this.storedAppointments)
          localStorage.setItem(appointmentListKey, JSON.stringify(this.storedAppointments));
          this.router.navigate(['restraunt/BookStatus']);
          this.restrauntService.openToastSuccess(APPOINTMENT_ADDED, ACTION);
        }
        else {
          this.alreadyExists = false;
        }
      }
      else {
        this.store.dispatch(RestrauntActions.addBookingAppointment({ appointments: newAppointment }));
        console.log(this.storedAppointments)
        localStorage.setItem(appointmentListKey, JSON.stringify(newAppointment));
        this.router.navigate(['restraunt/BookStatus']);
        this.restrauntService.openToastSuccess(APPOINTMENT_ADDED, ACTION);
      }
    }
  }
}
