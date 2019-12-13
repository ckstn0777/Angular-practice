import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Reactive Form은 이 모듈이 필요하다.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
