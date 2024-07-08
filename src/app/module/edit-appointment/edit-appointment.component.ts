import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { formData } from '../../interfaces/restraunt.interface';
import * as RestrauntActions from './../../store/actions/restraunt-list-actions';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RestrauntService } from '../../services/restraunt.service';
import { ACTION, APPOINTMENT_NOT_FOUND, APPOINTMENT_UPDATED_SUCCESSFULLY, appointmentListKey } from '../../enum/localStorage-enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.css',
  providers: [DatePipe]
})
export class EditAppointmentComponent {
  updateRestrauntForm: FormGroup;
  id!: string;
  formData$!: Observable<formData[]>;
  storedFormData: formData[] = [];
  tableSize: number[] = [1, 2, 4, 6];
  seatLocation: string[] = ['Left', 'Right', 'Center'];
  timeSlot: string[] = ['12:00 pm', '01:00 pm', '03:00 pm', '07:00 pm'];
  date!: string;
  timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>'
  minDate!: Date;
  maxDate!: Date;
  bookingId!: number;

  constructor(private route: ActivatedRoute, private store: Store, private datePipe: DatePipe, private router: Router,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
    private restrauntService: RestrauntService,) {
    this.updateRestrauntForm = new FormGroup({
      tableSize: new FormControl('', Validators.required),
      tableLoc: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
    this.iconRegistry.addSvgIconLiteral('time-icon', this.sanitizer.bypassSecurityTrustHtml(this.timeIcon));
  }

  ngOnInit(): void {
    // Restraunt Id 
    this.id = this.route.snapshot.params['id'];

    // Booking Id 
    this.route.queryParams.subscribe(params => {
      this.bookingId = Number(params['bookingId']);
    })
    this.formData$ = this.store.select(RestrauntSelectors.selectAppointments);

    this.formData$.subscribe(data => {
      if (data) {
        const filteredData = data.find(item => item.id === Number(this.bookingId));
        if (filteredData) {
          this.updateRestrauntForm.patchValue({
            tableSize: filteredData.tableSize,
            tableLoc: filteredData.tableLoc,
            date: filteredData.date,
            time: filteredData.time
          })
        }
      }
    });

    // Fetches booking list 
    let storedFormData = localStorage.getItem(appointmentListKey);
    if (storedFormData) {
      this.storedFormData = JSON.parse(storedFormData);
    }

    // Date Validator 
    this.minDate = new Date();

    // Set maxDate to one month from today's date
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    this.maxDate = maxDate;

  }

  // Submits and updates form data 
  onUpdate(): void {
    if (this.updateRestrauntForm.invalid) {
      return;
    }
    else {
      const formValues = this.updateRestrauntForm.value;
      let updatedDate = this.datePipe.transform(formValues.date, 'MM-dd-yyyy');
      if (updatedDate) {
        this.date = updatedDate;
      }
      const updatedData = {
        id: this.bookingId,
        restrauntId: Number(this.id),
        tableSize: formValues.tableSize,
        tableLoc: formValues.tableLoc,
        date: updatedDate,
        time: formValues.time
      };
      let formData = localStorage.getItem(appointmentListKey);
      if (formData) {
        let parsedFormData = JSON.parse(formData);
        if (parsedFormData) {
          const dataIndex = parsedFormData.findIndex((item: { id: number }) => item.id === updatedData.id);
          if (dataIndex !== -1) {
            parsedFormData[dataIndex] = updatedData;
            this.restrauntService.updateAppointment(parsedFormData);
            this.store.dispatch(RestrauntActions.updateBookedAppointment({ appointments: parsedFormData }));
            this.restrauntService.openToastSuccess(APPOINTMENT_UPDATED_SUCCESSFULLY, ACTION);
            this.router.navigate(['/restraunt']);
          }
        }
      }
      else {
        this.restrauntService.openToastSuccess(APPOINTMENT_NOT_FOUND, ACTION);
      }
    }
  }
}
