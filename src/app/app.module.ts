import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { restrauntReducer } from './store/reducers/restraunt-list-reducers';
import { EffectsModule } from '@ngrx/effects';
import { RestrauntEffects } from './store/effects/restraunt-list-effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({'restraunts' : restrauntReducer}),
    EffectsModule.forRoot([RestrauntEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
