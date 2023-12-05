import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './Component/home/home.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ExerciseComponent} from "./Component/exercise/exercise.component";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { StartComponent } from './Component/start/start.component';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AddExerciseDialogOverviewComponent } from './Component/add-exercise-dialog-overview/add-exercise-dialog-overview.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogAlert, DisplayWorkoutComponent } from './Component/display-workout/display-workout.component';
import { MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { TimerComponent } from './Component/timer/timer.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StoricoComponent } from './Component/storico/storico.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    StartComponent,
    AddExerciseDialogOverviewComponent,
    DisplayWorkoutComponent,
    TimerComponent,
    DialogAlert,
    StoricoComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    ExerciseComponent,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, 
    MatGridListModule,
    MatPaginatorModule,
 MatProgressSpinnerModule,
 ScrollingModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }