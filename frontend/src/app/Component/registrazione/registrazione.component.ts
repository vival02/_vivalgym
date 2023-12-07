import { Component, OnInit } from '@angular/core';
import { User, UserLoginData } from "../../Service/user";
import { UserService } from "../../Service/user.service";
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VariableBinding } from '@angular/compiler';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {
  hide = true;
  registrazioneForm: FormGroup;
  public redirectUrl: string;


  public userLoginData: User = { email: '', password: '' };
  public user: User = { idUser: null, nome: '', cognome: '', email: '', password: '', dataDiNascita: null };
  ngOnInit(): void {
    this.registrazioneForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cognome: new FormControl(null, Validators.required),
      dataDiNascita: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })

  }
  onSubmit() {
    this.user.nome = this.registrazioneForm.get('nome').value;
    this.user.cognome = this.registrazioneForm.get('cognome').value;
    this.user.dataDiNascita = this.registrazioneForm.get('dataDiNascita').value;
    this.user.email = this.registrazioneForm.get('email').value;
    this.user.password = this.registrazioneForm.get('password').value;
    this.userLoginData.email = this.registrazioneForm.get('email').value;
    this.userLoginData.password = this.registrazioneForm.get('password').value;
    this.registrazione();

  }

  public registrazione(): void {
    var errore=false;
    this.userService.addUser(this.user).subscribe({
      next: (res) => {
        if (res != null) {

          sessionStorage.setItem('User', JSON.stringify(res));
          console.log(res);
          // this.router.navigate(["/dashboard"]);
        }else{
          alert("Email già registrata!") 
        }

      },
      error: error => { alert("Email già registrata!") ,errore=true},
      complete: () => {
          if(!errore){
            this.login()
          }
        // define on request complete logic
        // 'complete' is not the same as 'finalize'!!
        // this logic will not be executed if error is fired
      }

    });
  }

  constructor(private userService: UserService, private router: Router) { }
  public login(): void {

    this.userService.testLogin(this.userLoginData).subscribe({
      next: (res) => {
        if (res != null) {
          sessionStorage.setItem('User', JSON.stringify(res));
          console.log(res);
          this.router.navigate(["/dashboard"]);
        }

      },
      error: error => alert("Email o password errati")
    });
  }


}


