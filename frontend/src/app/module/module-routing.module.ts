import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRestrauntComponent } from './book-restraunt/book-restraunt.component';
import { RestrauntListComponent } from './restraunt-list/restraunt-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { CanDeactivateGuard } from '../guard/unsaved-changes.guard';

const routes: Routes = [
  {
    path: 'home',
    component: RestrauntListComponent
  },
  {
    path: 'BookAppointment/:id',
    component: BookRestrauntComponent,
    canDeactivate: [CanDeactivateGuard]
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
