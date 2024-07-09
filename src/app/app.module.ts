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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ 'app': restrauntReducer}),
    EffectsModule.forRoot([RestrauntEffects]),
    StoreDevtoolsModule.instrument({ })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
