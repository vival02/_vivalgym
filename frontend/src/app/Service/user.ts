export interface User {
  idUser?: number,
  nome?: string,
  cognome?: string ,
  email?: string,
  password? : string,
  dataDiNascita?: Date
}
export interface UserLoginData {
  email: string,
  password: string
}
