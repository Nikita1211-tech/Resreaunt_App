import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { RestrauntListComponent } from './restraunt-list/restraunt-list.component';
import { BookRestrauntComponent } from './book-restraunt/book-restraunt.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BookStatusComponent } from './book-status/book-status.component';
import { RestrauntPreviewComponent } from '../common/component/restraunt-preview/restraunt-preview.component';
import { NavbarComponent } from '../common/component/navbar/navbar.component';

@NgModule({
  declarations: [
    RestrauntListComponent,
    BookRestrauntComponent,
    BookStatusComponent,
    RestrauntPreviewComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ModuleModule { }
