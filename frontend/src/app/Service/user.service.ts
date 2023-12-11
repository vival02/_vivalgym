import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import {Observable} from "rxjs";
import {User, UserLoginData} from "./user";
@Injectable({
  providedIn: 'root'
})
//service per utenti
export class UserService {
  private apiServerUrl = enviroment.apiBaseUrl;

  constructor(private http:HttpClient) { }
 // controllo credenziali utente 
  public testLogin(loginData:User):Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/login`,loginData);
  }
// aggiunta utente 
  public addUser(loginData:User):Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/add-user`,loginData);
  
  }

}
