import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Component/home/home.component";
import {ExerciseComponent} from "./Component/exercise/exercise.component";
import {StartComponent} from "./Component/start/start.component";
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { DisplayWorkoutComponent } from './Component/display-workout/display-workout.component';
import { StoricoComponent } from './Component/storico/storico.component';
import { RegistrazioneComponent } from './Component/registrazione/registrazione.component';

const routes: Routes = [
 


  {

    path:"dashboard",component:DashboardComponent,
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path:"exercise",component:ExerciseComponent
      },
      {
        path:"home",component:HomeComponent,
      },
      {
        path:"storico",component:StoricoComponent,
      },
      {
        path:"home/workout/:idWorkout",component:DisplayWorkoutComponent
      },
    ]
  },
  {
    path:"",component:StartComponent,
  },
  {
    path:"login",component:StartComponent,
  },
  {
    path:"registrazione",component:RegistrazioneComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
