import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Exercise} from "../../Service/exercise";
import {ExerciseService} from "../../Service/exercise.service";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-exercise-dialog-overview',
  templateUrl: './add-exercise-dialog-overview.component.html',
  styleUrls: ['./add-exercise-dialog-overview.component.css']
})

export class AddExerciseDialogOverviewComponent implements OnInit{
  panelOpenState = false; 

  thirdPartyForm = new FormGroup({
  
 
  });
  
  public exercises: Exercise[] = [];
 // public exerciseWorkout: Exercise[]= [];
  ngOnInit(): void {
    console.log("chiamato")
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
 

  constructor(
    private fb: FormBuilder, public dialogRef: MatDialogRef<AddExerciseDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public exerciseWorkout: Exercise[],private exerciseService:ExerciseService) {
      dialogRef.disableClose = true;
    }

  onClosed(): void {
    this.dialogRef.close({data:this.exerciseWorkout});
  }
  addExerciseToWorkout(exerciseSelect:Exercise): void{
    this.exerciseWorkout = this.exerciseWorkout || [];
      console.log(this.exerciseWorkout)
      this.exerciseWorkout.push(exerciseSelect) 
     
  }
  onSubmit():void{

  }

}

