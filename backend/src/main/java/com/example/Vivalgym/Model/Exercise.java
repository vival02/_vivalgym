package com.example.Vivalgym.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="exercise")
public class Exercise {
    @Id
    @GeneratedValue(generator = "exercise_gen",strategy= GenerationType.AUTO)
    @SequenceGenerator(name = "exercise_gen",sequenceName = "exercise_seq",initialValue =1, allocationSize = 1)
    private int idExercise;
    private String nome;
    private String tipologia;
    private String gruppoMuscolare;
    private String Img ;
    private String descrizione;
    private String Attrezzatura;
    private String livello;

    public void setIdExercise(int idExercise) {
        this.idExercise = idExercise;
    }

    public String getAttrezzatura() {
        return Attrezzatura;
    }

    public void setAttrezzatura(String attrezzatura) {
        Attrezzatura = attrezzatura;
    }

    //
    public String getLivello() {
        return livello;
    }

    public void setLivello(String livello) {
        this.livello = livello;
    }


    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Integer getIdExercise() {
        return idExercise;
    }

    public void setIdExercise(Integer idExercise) {
        this.idExercise = idExercise;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getGruppoMuscolare() {
        return gruppoMuscolare;
    }

    public void setGruppoMuscolare(String gruppoMuscolare) {
        this.gruppoMuscolare = gruppoMuscolare;
    }
}
