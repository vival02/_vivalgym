import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(  private router: Router){}

  opened=true;
  logOut(){
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
