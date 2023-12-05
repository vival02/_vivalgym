import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../Service/user';
import { WorkoutSession, WorkoutComplete, WorkoutSessionClass, ripetizionixkgArray, Ripetizionixkg } from '../../Service/workout';
import { WorkoutService } from '../../Service/workout.service';
import { Exercise } from 'src/app/Service/exercise';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-storico',
  templateUrl: './storico.component.html',
  styleUrls: ['./storico.component.css']
})
export class StoricoComponent implements OnInit {
  private user: User = JSON.parse(sessionStorage.getItem('User'));

  workoutService = inject(WorkoutService);
  workoutSessions: WorkoutSessionClass[] = []
  workoutsComplete: WorkoutComplete[] = []
  workoutData: workoutData[] = []
  exercise = [];
  workoutDataSingle: workoutData = {
    idWorkoutSession: '',
    exercise: []
  }
  exerciseAndData: ExerciseAndData = {
    exercise: null,
    ripetizionixkg: []
  };
  private i: number = 0;
  getWorkoutsComplete(): void {
    this.workoutService.getWorkoutsComplete(this.user.idUser).subscribe({
      next: (res) => {
        this.workoutsComplete.push(...res);
      },
      error: (error) => { alert('Unable to get list of workouts') },
      complete: () => {
        var temp = [];

        this.workoutsComplete.forEach(element => {
          this.pushworkoutSessions(element.workoutSession, element.nome)
        });
        this.workoutSessions.sort(function (a, b) {
          return new Date(b.dataSvolgimento).getTime() - new Date(a.dataSvolgimento).getTime();
        });
        console.log(this.workoutSessions)
        this.getDataWorkoutSession()
      }
    });
  }

  pushworkoutSessions(workoutSessions: WorkoutSessionClass[], nome: string) {
    var date;
    var yyyy;
    const options: Intl.DateTimeFormatOptions = { month: "short", day: 'numeric', year: 'numeric', hour: 'numeric', minute: "numeric" };
    workoutSessions.forEach(element => {
      element.nome = nome
      this.workoutSessions.push(element);
      date = new Date(element.dataSvolgimento).toLocaleString("it-IT",options)
      element.dataSvolgimento = date
      element.workoutSessionDetails.forEach(workoutSessionDetails => {
      var ripetizioniParse = JSON.parse(workoutSessionDetails.ripetizionixkg);

        workoutSessionDetails.ripetizionixkgJson = ripetizioniParse
        console.log(workoutSessionDetails.ripetizionixkg)
      });
    });
  }

  getAllWorkoutSessions(): void {
    this.workoutService.getAllWorkoutSessionsWithIdUser(this.user.idUser).subscribe({
      next: (res) => {
        this.workoutSessions.push(...res);
      },
      error: (error) => alert('Unable to get list of workouts'),
    });
  }

  getDataWorkoutSession() {
    this.workoutData.length = 0;
    this.exerciseAndData.ripetizionixkg.length = 0
    //console.log(this.workoutSessions)
    this.workoutSessions.forEach(element1 => {
      this.workoutDataSingle.idWorkoutSession = element1.idWorkoutSession;
      //  console.log(element1.workoutSessionDetails)
      element1.workoutSessionDetails.forEach(element => {
        this.exerciseAndData.exercise = element.exercise;
        this.exerciseAndData.ripetizionixkg.push(JSON.parse(element.ripetizionixkg))
        this.workoutDataSingle.exercise.push(element.exercise);

      });
      this.workoutData.push(this.workoutDataSingle)
      //console.log(" single " + this.workoutDataSingle.exercise)
    })

    // console.log(this.workoutSessions)
  }
  findExercise(i: string) {
    // REALIZZAZIONE => continua ad aggiornare perchè deve chiamare una funzione meglio se fai una funzione 
    return (this.workoutData.filter(element => { element.idWorkoutSession == i }))
    return this.exercise
  }
  calcolaColonne() {
    return this.workoutSessions.length
  }
  ngOnInit(): void {

    this.getWorkoutsComplete();

  }

}
export class workoutData {
  idWorkoutSession: string;
  exercise: object[]

}
export interface ExerciseAndData {
  exercise?: {
    idExercise?: number;
  };

  ripetizionixkg?: Ripetizionixkg[];
}