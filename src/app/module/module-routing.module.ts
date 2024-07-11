import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRestrauntComponent } from './book-restraunt/book-restraunt.component';
import { RestrauntListComponent } from './restraunt-list/restraunt-list.component';
import { BookStatusComponent } from './book-status/book-status.component';

const routes: Routes = [
  {
    path: '',
    component: RestrauntListComponent
  },
  {
    path: 'BookAppointment/:id',
    component: BookRestrauntComponent
  },
  {
    path: 'BookStatus',
    component: BookStatusComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
