import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Exercise,ExerciseTypes } from './exercise';
import { enviroment } from 'src/enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiServerUrl = enviroment.apiBaseUrl;
  
  private   idExercise : number =0;
  constructor(private http:HttpClient) { }
  public getExercises(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(`${this.apiServerUrl}/exercises`);
  }
  public getExerciseTypes(): Observable<ExerciseTypes[]>{
    return this.http.get<ExerciseTypes[]>(`${this.apiServerUrl}/exercise-types`);
  }
  }
