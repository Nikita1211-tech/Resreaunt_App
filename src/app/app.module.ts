import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { restrauntReducer } from './store/reducers/restraunt-list-reducers';
import { EffectsModule } from '@ngrx/effects';
import { RestrauntEffects } from './store/effects/restraunt-list-effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SpinnerComponent } from './common/component/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './common/component/navbar/navbar.component';
import { bookingReducer } from './store/reducers/booking-list-reducers';
import { BookingEffects } from './store/effects/booking-list-effects';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({ 'restraunt': restrauntReducer, 'booking': bookingReducer}),
    EffectsModule.forRoot([RestrauntEffects, BookingEffects]),
    StoreDevtoolsModule.instrument({ })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
