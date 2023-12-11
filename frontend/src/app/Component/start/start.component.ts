import { Component, OnInit } from '@angular/core';
import { User, UserLoginData } from "../../Service/user";
import { UserService } from "../../Service/user.service";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
// form per il login 
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],

})
export class StartComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  public redirectUrl: string;
  public userLoginData: UserLoginData = { email: '', password: '' };
  public user: User = { idUser: null, nome: '', cognome: '', email: '', dataDiNascita: null };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }
  //registrazione dati utente 
  onSubmit() {
    this.userLoginData.email = this.loginForm.get('email').value;
    this.userLoginData.password = this.loginForm.get('password').value;
    this.login();
  }

  constructor(private userService: UserService, private router: Router) { }

  // controllo password e email (server)
  public login(): void {
    this.userService.testLogin(this.userLoginData).subscribe({
      next: (res) => {
        if (res != null) {
          sessionStorage.setItem('User', JSON.stringify(res));
          this.router.navigate(["/dashboard"]);
        } else {
          alert("Email/password errati o utente non registrato")
        }
      },
      error: error => alert("Email o password errati")
    });
  }

}
