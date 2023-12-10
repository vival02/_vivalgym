import {
  ChangeDetectorRef,
  Component,
  OnInit,
  VERSION,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../Service/workout.service';
import { Workout } from '../../Service/workout';
import { WorkoutDetails } from '../../Service/workout';
import { WorkoutSession } from '../../Service/workout';
import { WorkoutSessionDetails, Ripetizionixkg, ripetizionixkgArray } from '../../Service/workout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TimerComponent } from '../timer/timer.component';
@Component({
  selector: 'app-display-workout',
  templateUrl: './display-workout.component.html',
  styleUrls: ['./display-workout.component.css'],
})
export class DisplayWorkoutComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(TimerComponent) timerComponent;
  serieSvolte = 0;
  obs: Observable<any>;
  dataSource: MatTableDataSource<WorkoutDetails>;
  route: ActivatedRoute = inject(ActivatedRoute);
  workoutService = inject(WorkoutService);
  ripetizionixkgArray: ripetizionixkgArray[] = []
  singleRipetizionixkgArray: ripetizionixkgArray;
  diameterSpinner:number=100;
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
  workoutSalvato: boolean = false;
  serieRichieste:string = '';
  details: WorkoutSessionDetails[] = [];
  detailsSpecificExercise: Ripetizionixkg[] = [];
  singleDetail: WorkoutSessionDetails;
  arrayColSpan:number[]=[3,2,1];

  public workout: Workout = {
    nome: '',
    note: '',
    idWorkout: null,
    user: { idUser: null },
  };
  public workoutDetails: WorkoutDetails[] = [];
  public prova: WorkoutDetails = {
    exercise: { idExercise: 0, nome: '' },
    note: '',
    workout: { idWorkout: '' },
    minutiCardio: 0,
    ripetizioniBase: '',
    tempoRecupero: 60,
    array: undefined
  };
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;



  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 3;
    if((event.target.innerWidth <= 700)){
      this.arrayColSpan[0]=1;
      this.arrayColSpan[1]=1;
      this.diameterSpinner=70;
    }else{
      this.arrayColSpan[0]=3;
      this.arrayColSpan[1]=2;
      this.diameterSpinner=100;
    }
    console.log(this.arrayColSpan)
    console.log(this.breakpoint)
  }
  currentTempoRecupero: number = 60;
  prova2(i: number): void {

  }
  public idWorkout: string = '';
  public length: number = 0;
  pageSize = 1;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.idWorkout = String(this.route.snapshot.params['idWorkout']);
    this.exerciseForm = this.fb.group({
      kg: new FormControl(null, Validators.required),
      ripetizioni: new FormControl(null),
    });
  }

  public getWorkoutByIdWorkout(): void {
    this.workoutService.getWorkoutByIdWorkout(this.idWorkout).subscribe({
      next: (res) => {
        this.workout = res;
      },
      error: (error) => alert('Unable to get specific workout'),
    });
  }
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
    console.log(this.breakpoint)

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
    this.serieRichieste= this.workoutDetails.at(this.dataSource.paginator.pageIndex).ripetizioniBase|| '0'
  }

  public getDate(): string {
    var n = new Date();
    var data =
      n.getMonth() + 1 + '/' + n.getDate() + '/' + n.getFullYear() + ' ' + n.getHours() + ':' + n.getMinutes();
      console.log(data)
    return data;
  }

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
  name = 'Angular';

  exerciseForm: FormGroup;

  newQuantity(kg: number, ripetizioni: number): FormGroup {
    return this.fb.group({
      kg: kg,
      ripetizioni: ripetizioni,
    });
  }

  addQuantity() { }

  removeQuantity(i: number) { }

  addNewDetails(
    kilogrammiForm: number,
    ripetizioni: number
  ):
    WorkoutSessionDetails {
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
  addWorkoutSession() {

    this.ripetizionixkgArray.forEach(element => {
      var objRipetizioni = JSON.stringify(element.ripetizionixkg);
      // element.ripetizionixkg=objRipetizioni;
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
    this.serieSvolte=this.detailsSpecificExercise.length+1
    this.timerComponent.start(0,this.currentTempoRecupero)
    this.exerciseForm.reset();
    this.getDetailsExercise();
  }


  handlePageEvent(e: PageEvent) {
    this.getDetailsExercise();
   this.serieRichieste= this.workoutDetails.at(this.dataSource.paginator.pageIndex).ripetizioniBase || '0'
    this.currentTempoRecupero = this.workoutDetails.at(this.dataSource.paginator.pageIndex).tempoRecupero
    this.serieSvolte=this.detailsSpecificExercise.length
  }
 
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
