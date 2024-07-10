import { Component, OnInit } from '@angular/core';
import * as RestrauntActions from './../../store/actions/restraunt-list-actions';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { Store } from '@ngrx/store';
import {  Appointment, Restraunt } from '../../interfaces/restraunt.interface';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RestrauntService } from '../../services/restraunt.service';
import { ACTION, APPOINTMENT_DELETED, appointmentListKey } from '../../enum/localStorage-enum';

@Component({
  selector: 'app-book-status',
  templateUrl: './book-status.component.html',
  styleUrl: './book-status.component.css'
})
export class BookStatusComponent implements OnInit {
  appointmentList!: Observable<Appointment[]>;
  restrauntList!: Observable<Restraunt[]>;
  appointmentListData!: Appointment[];
  id!: string;
  editIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1 .8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"/></svg>'
  deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0 -12-12h-24a12 12 0 0 0 -12 12v216a12 12 0 0 0 12 12zM432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0 -41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0 -16-16zM171.8 50.9A6 6 0 0 1 177 48h94a6 6 0 0 1 5.2 2.9L293.6 80H154.4zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0 -12-12h-24a12 12 0 0 0 -12 12v216a12 12 0 0 0 12 12z"/></svg>'

  constructor(private store: Store, private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer, private restrauntService: RestrauntService) {
    this.iconRegistry.addSvgIconLiteral('edit-icon', this.sanitizer.bypassSecurityTrustHtml(this.editIcon));
    this.iconRegistry.addSvgIconLiteral('delete-icon', this.sanitizer.bypassSecurityTrustHtml(this.deleteIcon));
  }

  ngOnInit(): void {
    this.restrauntList = this.store.select(RestrauntSelectors.selectAllRestraunt);
    this.appointmentList = this.store.select(RestrauntSelectors.selectAllAppointments);
    this.appointmentList.subscribe((value) => {
      this.appointmentListData = value;
    });
  }

  // Deletes appointment by id
  deleteAppointment(id: number): void {
    this.store.dispatch(RestrauntActions.deleteBookedAppointment({ id: id }));
    console.log(this.appointmentListData)
    localStorage.setItem(appointmentListKey, JSON.stringify(this.appointmentListData));
    this.restrauntService.openToastSuccess(APPOINTMENT_DELETED, ACTION);
  }
}
