import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { EventDetailsComponent } from './event-details/event-details.component';
import { HttpClientModule } from '@angular/common/http';
import { EventFormComponent } from './event-form/event-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialsModule} from './merials/materials.module'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    EventDetailsComponent,
    EventFormComponent,
   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
