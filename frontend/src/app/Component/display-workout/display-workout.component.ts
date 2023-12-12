import { ChangeDetectorRef, Component, OnInit, VERSION, ViewChild, inject, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../Service/workout.service';
import { Workout } from '../../Service/workout';
import { WorkoutDetails } from '../../Service/workout';
import { WorkoutSession } from '../../Service/workout';
import { WorkoutSessionDetails, Ripetizionixkg, ripetizionixkgArray } from '../../Service/workout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogContent, } from '@angular/material/dialog';
import { TimerComponent } from '../timer/timer.component';
import { Exercise } from 'src/app/Service/exercise';
// componente per display workout da eseguire
@Component({
  selector: 'app-display-workout',
  templateUrl: './display-workout.component.html',
  styleUrls: ['./display-workout.component.css'],
})

export class DisplayWorkoutComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  workoutService = inject(WorkoutService);
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginator per cambio esercizio
  @ViewChild(TimerComponent) timerComponent; // componente timer 
  serieSvolte = 0; // conteggio serie inserite

  // variabili per display esercizio corrente 
  obs: Observable<any>;
  dataSource: MatTableDataSource<WorkoutDetails>;
  ripetizionixkgArray: ripetizionixkgArray[] = [] // kg e ripetizioni per esercizio
  singleRipetizionixkgArray: ripetizionixkgArray;
  workoutSalvato: boolean = false;
  serieRichieste: string = ''; // serie inserite nel workout
  details: WorkoutSessionDetails[] = [];
  detailsSpecificExercise: Ripetizionixkg[] = [];
  singleDetail: WorkoutSessionDetails;
  public workoutDetails: WorkoutDetails[] = [];
  exerciseForm: FormGroup;
  currentTempoRecupero: number = 60;
  public idWorkout: string = '';
  public length: number = 0;
  pageSize = 1;
  pageEvent: PageEvent;

  // variabili per griglia responsive
  arrayColSpan: number[] = [3, 2, 1];
  breakpoint: number;
  diameterSpinner: number = 100;

  //inizializzazione interface
  workoutSession: WorkoutSession = {
    workout: {
      idWorkout: '',
      nome: '',
    },
    statoSvolgimento: '',
    dataSvolgimento: null,
    idWorkoutSession: '',
    workoutSessionDetails: [],
  };
  public workout: Workout = {
    nome: '',
    note: '',
    idWorkout: null,
    user: { idUser: null },
  };
  public prova: WorkoutDetails = {
    exercise: { idExercise: 0, nome: '' },
    note: '',
    workout: { idWorkout: '' },
    minutiCardio: 0,
    ripetizioniBase: '',
    tempoRecupero: 60,
    array: undefined
  };

  // disposizione griglia in base alla finestra
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 3;
    if ((event.target.innerWidth <= 700)) {
      this.arrayColSpan[0] = 1;
      this.arrayColSpan[1] = 1;
      this.diameterSpinner = 70;
    } else {
      this.arrayColSpan[0] = 3;
      this.arrayColSpan[1] = 2;
      this.diameterSpinner = 100;
    }

  }
  isCardio(exercise:Exercise){
    if(exercise.gruppoMuscolare == "Cardio"){
        return true
    }else{
        return false
    }

  }
  constructor(private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private router: Router, public dialog: MatDialog) {
    this.idWorkout = String(this.route.snapshot.params['idWorkout']);
    this.exerciseForm = this.fb.group({
      kg: new FormControl(null, Validators.required),
      ripetizioni: new FormControl(null),
    });
  }

  // get workout dal server in base all'id 
  public getWorkoutByIdWorkout(): void {
    this.workoutService.getWorkoutByIdWorkout(this.idWorkout).subscribe({
      next: (res) => {
        this.workout = res;
      },
      error: (error) => alert('Unable to get specific workout'),
    });
  }
  // get dettagli workout dal server in base all'id 
  public getWorkoutDetailsByIdWorkout(): void {
    this.workoutService.getWorkoutDetailsByIdWorkout(this.idWorkout).subscribe({
      next: (res) => {
        this.workoutDetails.push(...res);
        this.setPaginator();
      },
      error: (error) => alert('Unable to get specific workout'),
    });
  }

  ngOnInit(): void {
    this.getWorkoutByIdWorkout();
    this.getWorkoutDetailsByIdWorkout();
    const DATA: WorkoutDetails[] = this.workoutDetails;
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
  }

  getTempoRecupero() {
    return this.workoutDetails.at(this.dataSource.paginator.pageIndex).tempoRecupero
  }

  setPaginator() {
    const DATA: WorkoutDetails[] = this.workoutDetails;
    this.dataSource = new MatTableDataSource<WorkoutDetails>(DATA);
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.workoutDetails.length;
    this.currentTempoRecupero = this.workoutDetails.at(this.dataSource.paginator.pageIndex).tempoRecupero
    this.serieRichieste = this.workoutDetails.at(this.dataSource.paginator.pageIndex).ripetizioniBase || '0'
  }

  //formattazione data 
  public getDate(): string {
    var n = new Date();
    var data =
      n.getMonth() + 1 + '/' + n.getDate() + '/' + n.getFullYear() + ' ' + n.getHours() + ':' + n.getMinutes();
    return data;
  }

  // conferma salvataggio sessione workout
  openDialog(): void {
    const config = new MatDialogContent();
    const dialogRef = this.dialog.open(DialogAlertComponent, { disableClose: true });
    dialogRef.componentInstance.stringa_alert = "Vuoi salvare questo allenamento?";
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'yes') {
        this.addWorkoutSession();
      }
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    if (!this.workoutSalvato) {
      this.openDialog();
    }
  }

  addNewDetails(kilogrammiForm: number, ripetizioni: number): WorkoutSessionDetails {
    // filtra ripetizioni in base all'esercizio (per storico esercizi)
    var prova = this.ripetizionixkgArray.filter(item => item.numeroEsercizio == (this.dataSource.paginator.pageIndex))
    if (prova.length == 0) {
      this.singleRipetizionixkgArray = {
        numeroEsercizio: this.dataSource.paginator.pageIndex,
        exercise: {
          idExercise: this.workoutDetails.at(this.dataSource.paginator.pageIndex)
            .exercise.idExercise,
        },
        ripetizionixkg: []
      }
      this.singleRipetizionixkgArray.ripetizionixkg.push(this.exerciseForm.value)
      this.ripetizionixkgArray.push(this.singleRipetizionixkgArray)
    } else {
      var index = this.ripetizionixkgArray.findIndex(item => item.numeroEsercizio == (this.dataSource.paginator.pageIndex))
      this.ripetizionixkgArray.at(index).ripetizionixkg.push(this.exerciseForm.value)
    }
    return this.singleDetail; 
  }

  //chiamata al server per aggiunta sessione workout al database 
  addWorkoutSession() {
    // formattazione dati workout session
    this.ripetizionixkgArray.forEach(element => {
      var objRipetizioni = JSON.stringify(element.ripetizionixkg);
      this.singleDetail = {
        exercise: {
          idExercise: element.exercise.idExercise
        },
        ripetizionixkg: objRipetizioni,
        numeroEsercizio: element.numeroEsercizio,
        dataEsecuzione: this.getDate(),
      };
      this.workoutSession?.workoutSessionDetails?.push(this.singleDetail)
    })
    this.workoutSession.workout.idWorkout = this.idWorkout;
    this.workoutSession.statoSvolgimento = 'terminato';
    this.workoutSession.dataSvolgimento = new Date();

    //chiamata al service 
    this.workoutService
      .addWorkoutSessionAndDetails(this.workoutSession)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => alert('Unable to get specific workout'),
      });
    this.workoutSalvato = true;
  }


  getDetailsExercise() {
    this.detailsSpecificExercise.length = 0;
    var obj = this.ripetizionixkgArray.filter(item => item.numeroEsercizio == (this.dataSource.paginator.pageIndex))
    obj.forEach(item => {
      this.detailsSpecificExercise.push(...item.ripetizionixkg)
    })
  }

  onSubmit() {
    this.addNewDetails(
      this.exerciseForm.value.kg,
      this.exerciseForm.value.ripetizioni
    )
    this.serieSvolte = this.detailsSpecificExercise.length + 1
    this.timerComponent.start(0, this.currentTempoRecupero)
    this.exerciseForm.reset();
    this.getDetailsExercise();
  }

  //cambiamento display esercizio corrente
  handlePageEvent(e: PageEvent) {
    this.getDetailsExercise();
    this.serieRichieste = this.workoutDetails.at(this.dataSource.paginator.pageIndex).ripetizioniBase || '0'
    this.currentTempoRecupero = this.workoutDetails.at(this.dataSource.paginator.pageIndex).tempoRecupero
    this.serieSvolte = this.detailsSpecificExercise.length
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
