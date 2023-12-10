import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Exercise, ExerciseTypes } from "../../Service/exercise";
import { ExerciseService } from "../../Service/exercise.service";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  imports: [MatCardModule, MatGridListModule,MatButtonModule, CommonModule, MatPaginatorModule,MatIconModule],
  standalone: true,
})
export class ExerciseComponent implements OnInit {
  

showExercise:boolean = false
  tipiEsercizio: string[] = ['addominali', 'gambe', 'bicipiti', 'tricipiti', 'schiena', 'glutei', 'avambracci', 'spalle', 'cardio', 'petto']
  exerciseTypes: ExerciseTypes[] = []
  linkImmagine: string ='./assets/Immagini/';
  public exercises: Exercise[] = [];
  public exercisesForTypes: Exercise[] = [];
  constructor(private exerciseService: ExerciseService,private el: ElementRef,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getExercises();
    this.getExerciseTypes();
  }
  public getExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (res) => {
       
        this.exercises = res;
       
         console.log(this.exercises);
      },
      error: error => alert("Unable to get list of exercises")
    });
  }
  
  public showTypeExercise(){
    this.showExercise =!this.showExercise
  }
  public showExerciseGroup(gruppoMuscolare:string){
    this.showExercise =!this.showExercise
    gruppoMuscolare.toLowerCase()


    this.exercisesForTypes = this.exercises.filter(item => item.gruppoMuscolare.includes(gruppoMuscolare.charAt(0).toUpperCase() + gruppoMuscolare.slice(1)) )
    console.log("ff " +gruppoMuscolare)
  }
  public getExerciseTypes(): void {
    this.exerciseService.getExerciseTypes().subscribe({
      next: (res) => {
        console.log(res)
        this.exerciseTypes = res;
        
        //console.log(this.exercises);
      },
      error: (error) => { alert('Unable to get list of workouts') },
      complete: () => {
        this.exerciseTypes.forEach(element => { 
          element.linkImmagine = this.linkImmagine + element.immagine
        })
        console.log(this.exerciseTypes);

      },
    });
  
  }
  
  openDialog(exercise:Exercise): void {
    const config = new MatDialogContent();
    const dialogRef = this.dialog.open(DialogExerciseDettagliComponent);
    dialogRef.componentInstance.exercise =exercise;




  }
}

@Component({
  selector: 'app-dialog-exercise-dettagli',
  templateUrl: 'dialog-exercise-dettagli.component.html',
  
})
export class DialogExerciseDettagliComponent {
  constructor(public dialogRef: MatDialogRef<DialogExerciseDettagliComponent>) { }
  public exercise: Exercise




}

