import { Component, Inject, OnInit } from '@angular/core';
import { Exercise, ExerciseTypes } from "../../Service/exercise";
import { ExerciseService } from "../../Service/exercise.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// componente per selezionare gli esercizi da inserire nel workout
@Component({
  selector: 'app-add-exercise-dialog-overview',
  templateUrl: './add-exercise-dialog-overview.component.html',
  styleUrls: ['./add-exercise-dialog-overview.component.css']
})

export class AddExerciseDialogOverviewComponent implements OnInit {
  showExercise: boolean = false // variabile per visualizzare gli esercizi di un gruppo muscolare
  exerciseTypes: ExerciseTypes[] = [] // elenco gruppi muscolari
  public exercisesForTypes: Exercise[] = [];  // esercizi di uno specifico gruppo muscolare
  linkImmagine: string = './assets/Immagini/'; // link immagine gruppi muscolari 
  thirdPartyForm = new FormGroup({});
  public exercises: Exercise[] = []; // elenco di tutti gli esercizi 

  ngOnInit(): void {
    this.getExercises();
    this.getExerciseTypes();
  }

  // get elenco completo degli esercizi dal Server 
  public getExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (res) => {
        this.exercises = res;
      },
      error: error => alert("Unable to get list of exercises")
    });
  }

  // Get elenco gruppi muscolari dal Server 
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

  // Filtre esercizi in base al gruppo muscolare 
  public showExerciseGroup(gruppoMuscolare: string) {
    this.showExercise = !this.showExercise
    this.exercisesForTypes = this.exercises.filter(item => item.gruppoMuscolare.includes(gruppoMuscolare.charAt(0).toUpperCase() + gruppoMuscolare.slice(1)))

  }

  constructor(
    private fb: FormBuilder, public dialogRef: MatDialogRef<AddExerciseDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public exerciseWorkout: Exercise[], private exerciseService: ExerciseService) {
    dialogRef.disableClose = true;
  }

  onClosed(): void {
    this.dialogRef.close({ data: this.exerciseWorkout });
  }

  // aggiunge l'esercizio selezionato al workout
  addExerciseToWorkout(exerciseSelect: Exercise): void {
    this.exerciseWorkout = this.exerciseWorkout || [];
    this.exerciseWorkout.push(exerciseSelect)
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

