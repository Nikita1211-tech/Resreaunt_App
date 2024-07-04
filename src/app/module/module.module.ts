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


@NgModule({
  declarations: [
    RestrauntListComponent,
    BookRestrauntComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ModuleModule { }
