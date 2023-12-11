import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Exercise,ExerciseTypes } from './exercise';
import { enviroment } from 'src/enviroments/enviroment';

// service per gli esercizi 
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiServerUrl = enviroment.apiBaseUrl;
  
  private   idExercise : number =0;
  constructor(private http:HttpClient) { }
  // get elenco completo degli esercizi 
  public getExercises(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(`${this.apiServerUrl}/exercises`);
  }
  // get elenco gruppi muscolari 
  public getExerciseTypes(): Observable<ExerciseTypes[]>{
    return this.http.get<ExerciseTypes[]>(`${this.apiServerUrl}/exercise-types`);
  }
  }
