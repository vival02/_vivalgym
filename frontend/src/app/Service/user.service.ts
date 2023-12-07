import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import {Observable} from "rxjs";
import {User, UserLoginData} from "./user";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = enviroment.apiBaseUrl;
  private   idUser : number =0;
  constructor(private http:HttpClient) { }
  public getPatients(): Observable<User[]>{
    //console.log(this.apiServerUrl/patients);
    return this.http.get<User[]>(`${this.apiServerUrl}/patients`);
  }
 
  public testLogin(loginData:User):Observable<User>{
  
    return this.http.put<User>(`${this.apiServerUrl}/login`,loginData);
  
  }

  public addUser(loginData:User):Observable<User>{
  
    return this.http.post<User>(`${this.apiServerUrl}/add-user`,loginData);
  
  }

}
