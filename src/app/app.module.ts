import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFireModule} from "@angular/fire/compat";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/module/material.module";
import { LoginComponent } from './components/login/component/login.component';
import {CoreModule} from "./core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    MaterialModule,
    RouterModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'hr'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
