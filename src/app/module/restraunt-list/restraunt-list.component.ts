import { Component, OnInit } from '@angular/core';
import { Restraunt } from '../../interfaces/restraunt.interface';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as RestrauntSelectors from './../../store/selectors/restraunt-list-selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers/restraunt-list-reducers';

@Component({
  selector: 'app-restraunt-list',
  templateUrl: './restraunt-list.component.html',
  styleUrl: './restraunt-list.component.css'
})

export class RestrauntListComponent implements OnInit {
  restrauntList$!: Observable<Restraunt[]>;
  bookIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54a6 6 0 0 1 -6-6V160h352v298a6 6 0 0 1 -6 6zm-52.8-200.7L198.8 404.5c-4.7 4.7-12.3 4.6-17-.1l-75.1-75.7c-4.7-4.7-4.6-12.3 .1-17l22.7-22.5c4.7-4.7 12.3-4.6 17 .1l44.1 44.5 111.1-110.2c4.7-4.7 12.3-4.6 17 .1l22.5 22.7c4.7 4.7 4.6 12.3-.1 17z"/></svg>';
  viewIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z"/></svg>'

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
    private store: Store<AppState>) {
    this.iconRegistry.addSvgIconLiteral('book-icon', this.sanitizer.bypassSecurityTrustHtml(this.bookIcon));
    this.iconRegistry.addSvgIconLiteral('view-icon', this.sanitizer.bypassSecurityTrustHtml(this.viewIcon));
  }

  ngOnInit(): void {
    this.restrauntList$ = this.store.select(RestrauntSelectors.selectAllRestraunt);
  }
}
