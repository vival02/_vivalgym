import { Component, OnInit, inject } from '@angular/core';
import { WorkoutService } from '../../Service/workout.service';
import { Workout } from '../../Service/workout';
import { WorkoutDetails } from '../../Service/workout';
import { WorkoutDetailsForExercise } from '../../Service/workout';
import { User } from '../../Service/user';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciseDialogOverviewComponent } from '../add-exercise-dialog-overview/add-exercise-dialog-overview.component';
import { Exercise } from 'src/app/Service/exercise';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  public idWorkout: String = '';
  public idWorkoutModify: String = '';
  public idCard: number = 0;
  public showAddWorkoutForm: boolean = false;
  public workouts: Workout[] = [];
  public workoutInput: Workout;
  public exerciseWorkout: Exercise[] = [];
  public workoutDetailsList: WorkoutDetailsForExercise[] = [];
  private user: User = JSON.parse(sessionStorage.getItem('User'));
  public onModification: boolean = false;
  constructor(
    private workoutService: WorkoutService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      user: {
        idUser: this.user.idUser,
      },
      nome: new FormControl(null, Validators.required),
      note: new FormControl(null),
      workoutDetails: this.fb.array([]),
    });
    this.idWorkout = String(this.route.snapshot.params['idWorkout']);
    console.log("con")
  }
  isFormValid(): boolean {
    return this.productForm.valid && this.exercise().length != 0;
  }
  ngOnInit(): void {
    this.getWorkouts();
    this.showAddWorkoutForm = false;
  }

  public addWorkoutForm(): void {
    this.exerciseWorkout.length = 0;
    this.workoutDetailsList.length = 0;
    this.workoutDetails().clear();
    this.productForm.reset();
    this.productForm.patchValue({
      user: {
        idUser: this.user.idUser,
      },
    });
    this.showAddWorkoutForm = !this.showAddWorkoutForm;
    this.onModification = false;
  }
  onSubmit(): void {
    if (!this.onModification) {
      this.workoutService
        .addWorkoutAndExercise(this.productForm.value)
        .subscribe({
          next: (res) => {
            this.getWorkouts();

            // addForm.reset();
          },
          error: (HttpErrorResponse) => alert(HttpErrorResponse.message),
        });

      this.exerciseWorkout.length = 0;
      this.workoutDetails().clear();
      this.productForm.reset();
      this.showAddWorkoutForm = false;


    } else {
      this.onSubmitOnModification();
    }


  }
  onSubmitOnModification(): void {
    console.log(this.productForm.value)
    this.workoutService
      .updateWorkout(this.productForm.value, this.idWorkoutModify)
      .subscribe({
        next: (res) => {
          this.getWorkouts();

        },
        error: (HttpErrorResponse) => alert(HttpErrorResponse.message),
      });
      this.addWorkoutForm()
  }
  getExercise() {
    return this.workoutDetailsList
  }
  public modifyWorkout(idWorkout: string, nomeWorkout: string): void {

    this.idWorkoutModify = idWorkout;
    this.onModification = true;
    this.exerciseWorkout.length = 0;
    this.workoutDetailsList.length = 0;
    this.workoutDetails().clear();

    this.workoutService.getWorkoutDetailByIdWorkout(idWorkout).subscribe({
      next: (res) => {
        // provare ad aggiumgere i campi mancanti nell'interface di workoutdetails !!!!!!

        this.workoutDetailsList.push(...res);
        this.workoutDetailsList.forEach(element => {
          this.exerciseWorkout.push(element.exercise)

        });
        this.addQuantity(this.exerciseWorkout);
        // this.showAddWorkoutForm = true;

      },
      error: (error) => { alert('Unable to get list of workouts') },
      complete: () => {
        // Questo blocco di codice verrà eseguito quando il caricamento sarà completato
        console.log('Data loading completed');
        this.productForm.patchValue({
          nome: nomeWorkout
        });
        this.showAddWorkoutForm = true;
      },
    });

    console.log(this.exerciseWorkout)

  }
  public getWorkouts(): void {
    this.workoutService.getWorkouts(this.user.idUser).subscribe({
      next: (res) => {
        this.workouts = res;

      },
      error: (error) => alert('Unable to get list of workouts'),
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddExerciseDialogOverviewComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.exerciseWorkout.push(...result.data);
      this.addQuantity(result.data);
      this.workoutDetails();
    });
  }

  thirdPartyForm: FormGroup;

  name = 'Angular';

  productForm!: FormGroup;
  workoutDetails(): FormArray {
    return this.productForm.get('workoutDetails') as FormArray;
  }

  newQuantity(idCard: number, exercise: Exercise): FormGroup {
    var idExercise = exercise.idExercise;
    return this.fb.group({
      numeroEsercizio: idCard,
      exercise: {
        idExercise: idExercise,
      },
      note: '',
      workout: {
        idWorkout: '',
      },
      minutiCardio: null,
      ripetizioniBase: '',
      tempoRecupero:null
    });
  }

  addQuantity(exercises: Exercise[]) {
    for (var exercise of exercises) {
      this.idCard = this.idCard + 1;
      this.workoutDetails().push(this.newQuantity(this.idCard, exercise));
    
    }
    console.log(this.workoutDetails())
  }

  getNome() {
    return this.productForm.get('nome').value;
  }
  exercise(): FormArray {
    return this.productForm.get('workoutDetails') as FormArray;
  }

  getWorkout(): FormArray {
    return this.productForm.value as FormArray;
  }
  workoutSingleDetails(index) {

    return this.exercise().at(index) as FormGroup;
  }
  ngOnDestroy() {
    this.showAddWorkoutForm = false;
  }

  eliminaWorkout(idWorkout: string) {
    this.workoutService
      .deleteWorkout(idWorkout)
      .subscribe({
        next: (res) => {
          this.getWorkouts();

          // addForm.reset();
        },
        error: (HttpErrorResponse) => alert(HttpErrorResponse.message),
      });

  }
  removeExerciseOnddWorkout(idExercise: number) {
    this.exerciseWorkout.splice(idExercise, 1)
    this.workoutDetails().removeAt(idExercise)
    console.log(idExercise);
  }
}