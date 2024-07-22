import { CanDeactivate } from '@angular/router';
import { BookRestrauntComponent } from '../module/book-restraunt/book-restraunt.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements CanDeactivate<BookRestrauntComponent> {

  canDeactivate(
    component: BookRestrauntComponent): boolean {
    console.log(component.canDeactivate());
    if (component.canDeactivate()) {
      return true;
    } else {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
  }
}