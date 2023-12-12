import { Component, OnInit, inject } from '@angular/core';
import { WorkoutService } from '../../Service/workout.service';
import { Workout } from '../../Service/workout';
import { WorkoutDetailsForExercise } from '../../Service/workout';
import { User } from '../../Service/user';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciseDialogOverviewComponent } from '../add-exercise-dialog-overview/add-exercise-dialog-overview.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
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
  productForm!: FormGroup;
  constructor(private workoutService: WorkoutService, public fb: FormBuilder, public dialog: MatDialog) {
    this.productForm = this.fb.group({
      user: {
        idUser: this.user.idUser,
      },
      nome: new FormControl(null, Validators.required),
      note: new FormControl(null),
      workoutDetails: this.fb.array([]),
    });
    this.idWorkout = String(this.route.snapshot.params['idWorkout']);
  }

  // controllo Form inserimento/modifica workout 
  isFormValid(): boolean {
    return this.productForm.valid && this.exercise().length != 0;
  }

  ngOnInit(): void {
    this.getWorkouts();
    this.showAddWorkoutForm = false;
  }

  public addWorkoutForm(close: boolean): void {
    // controllo se l'utente vuole chiudere il form di modifica e se ci sono esercizi inseriti
    if (close && this.exerciseWorkout.length > 0 && !this.onModification) {
      // se ci sono apro dialogAlert e chiedo se vuole salvare il workout
      this.openDialogAlert("Vuoi salvare il workout?").then((result) => {
        if (result == 'yes') {
          if (!this.isFormValid()) {
            this.openInfo("Inserire il nome ")
          } else {
            this.onSubmit();
          }
        } else if (result == 'no') {
          this.addWorkoutForm(false)
        }
      });
    } else {
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

  }

  // apertura dialog per conferma azione
  openDialogAlert(stringa_alert: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(DialogAlertComponent, {});
      dialogRef.componentInstance.stringa_alert = stringa_alert;
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      });
    });
  }

  // Inserimento workout (server)
  onSubmit(): void {
    if (!this.onModification) {
      this.workoutService
        .addWorkoutAndExercise(this.productForm.value)
        .subscribe({
          next: (res) => {
            this.getWorkouts();
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

  // modifica workout (server)
  onSubmitOnModification(): void {
    this.workoutService
      .updateWorkout(this.productForm.value, this.idWorkoutModify)
      .subscribe({
        next: (res) => {
          this.getWorkouts();
        },
        error: (HttpErrorResponse) => alert(HttpErrorResponse.message),
      });
    this.addWorkoutForm(true)
  }

  //funzione chiamata dal pulsante "modifica" di un workout 
  // apertura form per modifica
  public modifyWorkout(idWorkout: string, nomeWorkout: string): void {
    this.idWorkoutModify = idWorkout;
    this.onModification = true;
    this.exerciseWorkout.length = 0;
    this.workoutDetailsList.length = 0;
    this.workoutDetails().clear();
    // get per dettagli specifico esercizio (service)
    this.workoutService.getWorkoutDetailByIdWorkout(idWorkout).subscribe({
      next: (res) => {
        this.workoutDetailsList.push(...res);
        this.workoutDetailsList.forEach(element => {
          this.exerciseWorkout.push(element.exercise)
        });
        this.addQuantity(this.exerciseWorkout);
      },
      error: (error) => { alert('Unable to get list of workouts') },
      complete: () => {
        this.productForm.patchValue({
          nome: nomeWorkout
        });
        this.showAddWorkoutForm = true;
      },
    });
  }

  // get tutti workout inseriti dall'utente (service)
  public getWorkouts(): void {
    this.workoutService.getWorkouts(this.user.idUser).subscribe({
      next: (res) => {
        this.workouts = res;
      },
      error: (error) => alert('Unable to get list of workouts'),
    });
  }

  // apertura dialog per selezionare gli esercizi da inserire nel workout
  openDialog(): void {
    const dialogRef = this.dialog.open(AddExerciseDialogOverviewComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data != null) {
        this.exerciseWorkout.push(...result.data);
        this.addQuantity(result.data);
        this.workoutDetails();
      }
    });
  }

  openInfoRipetizioni() {
    let stringa = 'Inserire le ripetizioni e le serie per questo specifico esercizio.\nI formati più comuni sono ad esempio : \n 4x10 ovvero 10 ripetizioni per 4 serie \n 4x10 + 10 ovvero 4 superserie \n 3 x 12 / 10 / 8 ovvero 3 superserie con cambio di ripetizioni \n'
    this.openInfo(stringa)
  }

  // apertura dialog per info 
  openInfo(stringa_info: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {});
    dialogRef.componentInstance.stringa_info = stringa_info;
  }

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
      tempoRecupero: null
    });
  }

  addQuantity(exercises: Exercise[]) {
    for (var exercise of exercises) {
      this.idCard = this.idCard + 1;
      this.workoutDetails().push(this.newQuantity(this.idCard, exercise));

    }

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
  // elimina workout (service)
  eliminaWorkout(idWorkout: string) {
    this.openDialogAlert("Vuoi eliminare il workout?").then((result) => {
      if (result == 'yes') {
        this.workoutService
          .deleteWorkout(idWorkout)
          .subscribe({
            next: (res) => {
              this.getWorkouts();
            },
            error: (HttpErrorResponse) => alert(HttpErrorResponse.message),
          });
      }
    });
  }

  // controllo se l'utente ha gia inserito dei workout 
  findWorkout() {
    if (this.workouts.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  isCardio(exercise:Exercise){
    if(exercise.gruppoMuscolare == "Cardio"){
        return true
    }else{
        return false
    }

  }
  // rimuovo dal workout un esercizio selezionato dall'utente 
  removeExerciseOnddWorkout(idExercise: number) {
    this.exerciseWorkout.splice(idExercise, 1)
    this.workoutDetails().removeAt(idExercise)
  }
}

