import { Component, OnInit } from '@angular/core';
import { User } from "../../Service/user";
import { UserService } from "../../Service/user.service";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { animate, style, transition, trigger } from '@angular/animations';
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);
// Form per registrazione nuovo utente 
@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ]
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
  // registrazione dati utente 
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

  // salvataggio utente (service)
  public registrazione(): void {
    var errore = false;
    this.userService.addUser(this.user).subscribe({
      next: (res) => {
        if (res != null) {
          sessionStorage.setItem('User', JSON.stringify(res));
        } else {
          alert("Email già registrata!")
        }
      },
      error: error => { alert("Email già registrata!"), errore = true },
      complete: () => {
        if (!errore) {
          this.login()
        }
      }
    });
  }

  constructor(private userService: UserService, private router: Router) { }
  // login se l'utente non esiste già
  public login(): void {
    this.userService.testLogin(this.userLoginData).subscribe({
      next: (res) => {
        if (res != null) {
          sessionStorage.setItem('User', JSON.stringify(res));
          this.router.navigate(["/dashboard"]);
        }
      },
      error: error => alert("Email o password errati")
    });
  }

}


