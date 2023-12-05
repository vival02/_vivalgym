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
  public testLogin(loginData:UserLoginData):Observable<User>{
    let params = new HttpParams()
    .set('email',  loginData.email)
    .set('password',  loginData.password);
  
    return this.http.get<User>(`${this.apiServerUrl}/login`,{params: params});
  }

  

}
