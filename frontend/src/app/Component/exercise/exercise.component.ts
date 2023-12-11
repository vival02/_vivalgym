import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Exercise, ExerciseTypes } from "../../Service/exercise";
import { ExerciseService } from "../../Service/exercise.service";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

// componente per visualizzare tutti gli esercizi presenti 
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  imports: [MatCardModule, MatGridListModule, MatButtonModule, CommonModule, MatPaginatorModule, MatIconModule],
  standalone: true,
})

export class ExerciseComponent implements OnInit {
  showExercise: boolean = false // variabile per visualizzare esercizi del gruppo muscolare selezionato
  exerciseTypes: ExerciseTypes[] = [] // elenco gruppi muscolari 
  linkImmagine: string = './assets/Immagini/';
  public exercises: Exercise[] = []; // elenco completo esercizi 
  public exercisesForTypes: Exercise[] = []; // esercizi di uno specifico gruppo muscolare 
  constructor(private exerciseService: ExerciseService, private el: ElementRef, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getExercises();
    this.getExerciseTypes();
  }

  // get elenco esercizi completo (server)
  public getExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (res) => {
        this.exercises = res;
      },
      error: error => alert("Unable to get list of exercises")
    });
  }

  public showTypeExercise() {
    this.showExercise = !this.showExercise
  }

  public showExerciseGroup(gruppoMuscolare: string) {
    this.showExercise = !this.showExercise
    this.exercisesForTypes = this.exercises.filter(item => item.gruppoMuscolare.includes(gruppoMuscolare.charAt(0).toUpperCase() + gruppoMuscolare.slice(1)))
  }

  // get elenco gruppi muscolari (server)
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

  // apertura dialog per dettagli singolo esercizio
  openDialog(exercise: Exercise): void {
    const config = new MatDialogContent();
    const dialogRef = this.dialog.open(DialogExerciseDettagliComponent);
    dialogRef.componentInstance.exercise = exercise;
  }
}

// componente per visualizzazione dettagli singolo esercizio
@Component({
  selector: 'app-dialog-exercise-dettagli',
  templateUrl: 'dialog-exercise-dettagli.component.html',

})
export class DialogExerciseDettagliComponent {
  constructor(public dialogRef: MatDialogRef<DialogExerciseDettagliComponent>) { }
  public exercise: Exercise
}

