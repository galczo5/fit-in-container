import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FitContainerDirective } from './fit-container.directive';
import { HideElementDirective } from './hide-element.directive';

@NgModule({
  declarations: [
    AppComponent,
    FitContainerDirective,
    HideElementDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
