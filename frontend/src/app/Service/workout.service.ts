import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workout, WorkoutDetailsForExercise, WorkoutSession, WorkoutComplete } from './workout';
import { enviroment } from 'src/enviroments/enviroment';
import { WorkoutDetails } from './workout';
// service per workout 
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public getWorkoutDetailsByIdWorkout(idWorkout: String): Observable<WorkoutDetails[]> {
    console.log(idWorkout)
    return this.http.get<WorkoutDetails[]>(`${this.apiServerUrl}/workoutDetails/${idWorkout}`);
  }
  private apiServerUrl = enviroment.apiBaseUrl;
  private idExercise: number = 0;
  constructor(private http: HttpClient) { }
  //get  workout di un utente 
  public getWorkouts(idUser: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiServerUrl}/workouts/${idUser}`);
  }
  public getWorkoutsComplete(idUser: number): Observable<WorkoutComplete[]> {
    return this.http.get<WorkoutComplete[]>(`${this.apiServerUrl}/workouts/${idUser}`);
  }
  //get  workout con id 
  public getWorkoutByIdWorkout(idWorkout: String): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiServerUrl}/workout/${idWorkout}`);
  }
  // inserimento workout 
  public addExercisesWorkout(idWorkout: string, exercises: WorkoutDetails): Observable<Workout[]> {
    return this.http.post<Workout[]>(`${this.apiServerUrl}/workouts/${idWorkout}`, exercises);
  }
  public addWorkout(idUser: string, workout: Workout): Observable<Workout[]> {
    return this.http.post<Workout[]>(`${this.apiServerUrl}/workouts/${idUser}`, workout);
  }
  public addWorkoutAndExercise(workout: Workout): Observable<Workout[]> {
    return this.http.post<Workout[]>(`${this.apiServerUrl}/add-workout-and-exercise`, workout);
  }
  // elimina workout 
  public deleteWorkout(idWorkout: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete-workout/${idWorkout}`);
  }
  // inserimento sessione workout 
  public addWorkoutSessionAndDetails(workoutSession: WorkoutSession): Observable<WorkoutSession[]> {
    return this.http.post<WorkoutSession[]>(`${this.apiServerUrl}/add-workout-session-and-details`, workoutSession);
  }
  // get dettagli workout con id 
  public getWorkoutDetailByIdWorkout(idWorkout: String): Observable<WorkoutDetailsForExercise[]> {
    return this.http.get<WorkoutDetailsForExercise[]>(`${this.apiServerUrl}/workoutDetails/${idWorkout}`);
  }
  public updateWorkout(workout: Workout, idWorkout: String): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/update-workout/${idWorkout}`, workout);
  }
  public getAllWorkoutSessionsWithIdUser(idUser: number): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>(`${this.apiServerUrl}/workoutSessionWithIdUser/${idUser}`);
  }
}
