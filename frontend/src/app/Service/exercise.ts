export interface Exercise {
  idExercise: number,
  nome: string,
  nomeIng?: string,
  note: string,
  gruppoMuscolare: string,
  immagine?:string,
  tipologia: string,
  attrezzatura?:string
}

export interface ExerciseTypes {
  gruppoMuscolare: string,
  immagine: string
  linkImmagine: string
}
