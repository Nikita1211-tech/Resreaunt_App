import { Component, OnInit } from '@angular/core';
import { Restraunt, formData } from '../../interfaces/restraunt.interface';
import { RestrauntState } from '../../store/reducers/restraunt-list-reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-restraunt',
  templateUrl: './book-restraunt.component.html',
  styleUrl: './book-restraunt.component.css',
  providers: [DatePipe]
})
export class BookRestrauntComponent implements OnInit {
  restrauntForm: FormGroup;
  id!: number;
  restrauntList!: Observable<Restraunt[]>;
  restrauntData: Restraunt[] = [];
  formData: formData[] = [];
  storedFormData: formData[] = [];
  tableType: number[] = [1, 2, 4, 6];
  seatLocation: string[] = ['Left', 'Right', 'Center'];
  date!: string;
  alreadyExists: boolean = false;

  constructor(private store: Store<RestrauntState>, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.restrauntForm = new FormGroup({
      tableSize: new FormControl('', Validators.required),
      tableLoc: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.restrauntList = this.store.select(RestrauntSelectors.selectAllRestraunt);

    // Fetches restraunt list 
    let restraunt = localStorage.getItem('restrauntList');
    if (restraunt) {
      this.restrauntData = JSON.parse(restraunt);
    }

    // Fetches booking list 
    let storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      this.storedFormData = JSON.parse(storedFormData);
    }

  }

  changeDate(event: MatDatepickerInputEvent<Date>): void {
    let date = event.target.value;
    if (date) {
      this.transformDate(date);
    }
  }

  transformDate(date: Date): void {
    if (this.datePipe.transform(date, 'MM-dd-yyyy')) {
      const selectedDate = this.datePipe.transform(date, 'MM-dd-yyyy')
      if (selectedDate) {
        this.date = selectedDate;
      }
    };
  }

  onSubmit(): void {
    let formData: formData[] = JSON.parse(localStorage.getItem('formData') || '[]');
    let newFormData: formData = {
      id: formData.length + 1,
      tableSize: this.restrauntForm.get('tableSize')?.value,
      tableLoc: this.restrauntForm.get('tableLoc')?.value,
      date: this.date
    }
    if (this.storedFormData.length > 0) {
      for (let i = 0; i <= this.storedFormData.length; i++) {
        if (this.storedFormData[i].tableSize === newFormData.tableSize && this.storedFormData[i].date === newFormData.date) {
          this.alreadyExists = true;
          console.log(this.alreadyExists)
        }
        else {
          console.log(this.alreadyExists);
        }
      }
      if (this.alreadyExists === true) {
        console.log("Already exists");
      }
      else {
        formData.push(newFormData);
        localStorage.setItem('formData', JSON.stringify(formData));
        this.restrauntForm.reset();
      }
    }
    else {
      console.log("No records found");
      formData.push(newFormData);
      localStorage.setItem('formData', JSON.stringify(formData));
      this.restrauntForm.reset();
    }
  }
}
