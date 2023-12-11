import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../Service/user';
import { WorkoutComplete, WorkoutSessionClass, Ripetizionixkg } from '../../Service/workout';
import { WorkoutService } from '../../Service/workout.service';

// componente per visualizzare allenamenti svolti 
@Component({
  selector: 'app-storico',
  templateUrl: './storico.component.html',
  styleUrls: ['./storico.component.css']
})
export class StoricoComponent implements OnInit {
  private user: User = JSON.parse(sessionStorage.getItem('User'));
  private workoutService = inject(WorkoutService);
  protected workoutSessions: WorkoutSessionClass[] = [] // elenco allenamenti dell'utente 
  private workoutsComplete: WorkoutComplete[] = []
  private workoutData: workoutData[] = []
  private i: number = 0;
  private exercise = [];

  workoutDataSingle: workoutData = {
    idWorkoutSession: '',
    exercise: []
  }
  exerciseAndData: ExerciseAndData = {
    exercise: null,
    ripetizionixkg: []
  };

  // get allenamenti dell'utente (service)
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
        // ordinamento in ordine cronologico 
        this.workoutSessions.sort(function (a: { dataSvolgimento: Date }, b: { dataSvolgimento: Date }) {
          var da = new Date(a.dataSvolgimento);
          var db = new Date(b.dataSvolgimento);
          if (da > db) {
            return -1;
          } else if (da < db) {
            return 1;
          } else {
            return 0;
          }
        });
        var date;
        var yyyy;
        // formattazione date 
        const options: Intl.DateTimeFormatOptions = { month: "short", day: 'numeric', year: 'numeric', hour: 'numeric', minute: "numeric" };
        this.workoutSessions.forEach(element => {
          date = new Date(element.dataSvolgimento).toLocaleString("it-IT", options)
          element.dataSvolgimento = date
        });
        this.getDataWorkoutSession()
      }
    });
  }

  // controllo se ci sono allenamenti 
  findSession() {
    if (this.workoutSessions.length == 0) {
      return true;
    }
    return false;
  }

  // inserire kg e ripetizioni di ogni singolo esercizio 
  pushworkoutSessions(workoutSessions: WorkoutSessionClass[], nome: string) {
    workoutSessions.forEach(element => {
      element.nome = nome
      this.workoutSessions.push(element);
      element.workoutSessionDetails.forEach(workoutSessionDetails => {
        var ripetizioniParse = JSON.parse(workoutSessionDetails.ripetizionixkg);
        workoutSessionDetails.ripetizionixkgJson = ripetizioniParse
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
    this.workoutSessions.forEach(element1 => {
      this.workoutDataSingle.idWorkoutSession = element1.idWorkoutSession;
      element1.workoutSessionDetails.forEach(element => {
        this.exerciseAndData.exercise = element.exercise;
        this.exerciseAndData.ripetizionixkg.push(JSON.parse(element.ripetizionixkg))
        this.workoutDataSingle.exercise.push(element.exercise);
      });
      this.workoutData.push(this.workoutDataSingle)
    })

  }

  findExercise(i: string) {
    return (this.workoutData.filter(element => { element.idWorkoutSession == i }))
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