export interface Workout {
  user: {
    idUser: number;
  };
  nome: string;
  note: string;
  idWorkout: string;
}
export interface WorkoutDetails {
  array: any;
  exercise: {
    idExercise: number;
    nome: string;
  };
  note: string;
  workout: {
    idWorkout: string;
  };
  minutiCardio: number;
  ripetizioniBase: string;
  tempoRecupero:number;
}
export interface WorkoutDetailsForExercise {
  array: any;
  exercise: {
    idExercise: number,
    nome: string,
    note: string ,
    gruppoMuscolare: string,
    tipologia : string
  };
  note: string;
  workout: {
    idWorkout: string;
  };
  minutiCardio: number;
  ripetizioniBase: string;
}

export interface WorkoutSession {
  workout?: {
    idWorkout?: string;
    nome?:string;
  };
  statoSvolgimento?: string;
  dataSvolgimento?: Date;
  idWorkoutSession?: string;
  workoutSessionDetails?: WorkoutSessionDetails[];
}
export interface WorkoutSessionDetails {
  exercise?: {
    idExercise?: number,
    nome?: string,
    note?: string ,
    gruppoMuscolare?: string,
    tipologia?: string
  };
  ripetizionixkg:string,
  ripetizionixkgJson?:Ripetizionixkg[],
  dataEsecuzione?: string;
  numeroEsercizio: number;
}

export interface WorkoutComplete {
  user: {
    idUser: number;
  };
  nome: string;
  note: string;
  idWorkout: string;
  workoutSession?: WorkoutSession[];
}

export class WorkoutSessionClass {

  idWorkout?: string = '';
 nome?:string = '';
 statoSvolgimento?: string = '';
 dataSvolgimento?: Date = null;
 idWorkoutSession?: string  = '';
 workoutSessionDetails?: WorkoutSessionDetails[];
}
export class ripetizionixkgArray{
  numeroEsercizio:number=null;
  exercise?: {
    idExercise?: number;
  };
  ripetizionixkg?: Ripetizionixkg[];
}

export interface Ripetizionixkg{
  kg?:number,
  kilogrammi?:number
  ripetizioni?:number
}