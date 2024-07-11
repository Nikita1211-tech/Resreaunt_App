import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restraunt } from '../../../interfaces/restraunt.interface';
import { Store } from '@ngrx/store';
import * as RestrauntSelectors from './../../../store/selectors/restraunt-list-selectors';

@Component({
  selector: 'app-restraunt-preview',
  templateUrl: './restraunt-preview.component.html',
  styleUrl: './restraunt-preview.component.css',
})
export class RestrauntPreviewComponent implements OnInit {
  @Input() id!: number;
  restrauntId!: number;
  restrauntList$!: Observable<Restraunt[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.restrauntId = this.id;
    this.restrauntList$ = this.store.select(RestrauntSelectors.selectAllRestraunt);
  }
}
