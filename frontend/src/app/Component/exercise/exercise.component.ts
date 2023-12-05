import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Exercise} from "../../Service/exercise";
import {ExerciseService} from "../../Service/exercise.service";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule, MatPaginatorModule],
  standalone: true,
})
export class ExerciseComponent implements OnInit{
  tipiEsercizio:string[]=['addominali','gambe','bicipiti']
  public exercises: Exercise[] = [];
  constructor(private exerciseService:ExerciseService){}
  ngOnInit(): void {
    this.getExercises();

  }
  public getExercises() : void{
    this.exerciseService.getExercises().subscribe({
      next: (res)=>{
        this.exercises = res;
        console.log(this.exercises);
      },
      error:error=> alert("Unable to get list of exercises")
    });
  }
}
