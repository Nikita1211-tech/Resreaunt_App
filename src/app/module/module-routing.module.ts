import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRestrauntComponent } from './book-restraunt/book-restraunt.component';
import { RestrauntListComponent } from './restraunt-list/restraunt-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';

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
    path: 'Bookings',
    component: BookingListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
