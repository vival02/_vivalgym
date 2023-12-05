package com.example.Vivalgym.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class WorkoutSessionDetailsKey implements Serializable {
    @Column(name = "idWorkoutSession")
    private String idWorkoutSession;

    @Column(name = "idExercise")
    private Integer idExercise;

    @Column(name = "numeroEsercizio")
    private Integer numeroEsercizio;

    public String getIdWorkoutSession() {
        return idWorkoutSession;
    }

    public void setIdWorkoutSession(String idWorkoutSession) {
        this.idWorkoutSession = idWorkoutSession;
    }

    public Integer getIdExercise() {
        return idExercise;
    }

    public void setIdExercise(Integer idExercise) {
        this.idExercise = idExercise;
    }

    public Integer getNumeroEsercizio() {
        return numeroEsercizio;
    }

    public void setNumeroEsercizio(Integer numeroEsercizio) {
        this.numeroEsercizio = numeroEsercizio;
    }

    @Override
    public String toString() {
        return "WorkoutSessionDetailsKey{" +
                "numeroEsercizio=" + numeroEsercizio +
                '}';
    }
}