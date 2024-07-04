import { Component, OnInit } from '@angular/core';
import { Restraunt } from '../../interfaces/restraunt.interface';
import { RestrauntState } from '../../store/reducers/restraunt-list-reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-restraunt',
  templateUrl: './book-restraunt.component.html',
  styleUrl: './book-restraunt.component.css'
})
export class BookRestrauntComponent implements OnInit{
  id!: number;
  restrauntList!: Observable<Restraunt[]>;

  constructor(private store: Store<RestrauntState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.restrauntList = this.store.select(RestrauntSelectors.selectAllRestraunt);
  }
}
