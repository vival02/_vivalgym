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
    private String nomeIng;
    private String tipologia;
    private String rating;
    private String gruppoMuscolare;
    private String immagine1 ;
    private String immagine2 ;
    private String descrizione;
    private String Attrezzatura;
    private String livello;
    private String linkApprofondimento;
    public void setIdExercise(int idExercise) {
        this.idExercise = idExercise;
    }

    public String getAttrezzatura() {
        return Attrezzatura;
    }

    public void setAttrezzatura(String attrezzatura) {
        Attrezzatura = attrezzatura;
    }

    public String getNomeIng() {
        return nomeIng;
    }

    public void setNomeIng(String nomeIng) {
        this.nomeIng = nomeIng;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getImmagine1() {
        return immagine1;
    }

    public void setImmagine1(String immagine1) {
        this.immagine1 = immagine1;
    }

    public String getImmagine2() {
        return immagine2;
    }

    public void setImmagine2(String immagine2) {
        this.immagine2 = immagine2;
    }

    public String getLinkApprofondimento() {
        return linkApprofondimento;
    }

    public void setLinkApprofondimento(String linkApprofondimento) {
        this.linkApprofondimento = linkApprofondimento;
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
