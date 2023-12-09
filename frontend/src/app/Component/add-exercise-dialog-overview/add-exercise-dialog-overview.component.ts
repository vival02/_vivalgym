import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Exercise, ExerciseTypes } from "../../Service/exercise";
import { ExerciseService } from "../../Service/exercise.service";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-exercise-dialog-overview',
  templateUrl: './add-exercise-dialog-overview.component.html',
  styleUrls: ['./add-exercise-dialog-overview.component.css']
})

export class AddExerciseDialogOverviewComponent implements OnInit {
  panelOpenState = false;
  showExercise: boolean = false
  exerciseTypes: ExerciseTypes[] = []
  public exercisesForTypes: Exercise[] = [];
  linkImmagine: string = './assets/Immagini/';
  thirdPartyForm = new FormGroup({
  });

  public exercises: Exercise[] = [];
  // public exerciseWorkout: Exercise[]= [];
  ngOnInit(): void {

    this.getExercises();
    this.getExerciseTypes();
  }
  public getExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (res) => {
        this.exercises = res;
      },
      error: error => alert("Unable to get list of exercises")
    });
  }
  public getExerciseTypes(): void {
    this.exerciseService.getExerciseTypes().subscribe({
      next: (res) => {

        this.exerciseTypes = res;


      },
      error: (error) => { alert('Unable to get list of workouts') },
      complete: () => {
        this.exerciseTypes.forEach(element => {
          element.linkImmagine = this.linkImmagine + element.immagine
        })
   

      },
    });

  }
  public showTypeExercise() {
    this.showExercise = !this.showExercise
  }
  public showExerciseGroup(gruppoMuscolare: string) {
    this.showExercise = !this.showExercise
    this.exercisesForTypes = this.exercises.filter(item => item.gruppoMuscolare == "Leg")
  
  }
  constructor(
    private fb: FormBuilder, public dialogRef: MatDialogRef<AddExerciseDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public exerciseWorkout: Exercise[], private exerciseService: ExerciseService) {
    dialogRef.disableClose = true;
  }

  onClosed(): void {
    this.dialogRef.close({ data: this.exerciseWorkout });
  }
  addExerciseToWorkout(exerciseSelect: Exercise): void {
    this.exerciseWorkout = this.exerciseWorkout || [];
  
    this.exerciseWorkout.push(exerciseSelect)

  }
  onSubmit(): void {

  }

  // controllo se l'esercizio è già stato aggiunto 
  controlloExercise(idExercise): boolean {
    if (this.exerciseWorkout != null) {
      if (this.exerciseWorkout.find((element) => element.idExercise == idExercise)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
  // rimuovo l'esercizio dalla lista (funzione chiamata dal pulsante "rimuovi")
  removeExerciseOnddWorkout(exercise: Exercise) {
    const index = this.exerciseWorkout.indexOf(exercise, 0);
    this.exerciseWorkout.splice(index, 1)
    this.controlloExercise(exercise.idExercise)

  }
}

