package com.example.Vivalgym.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import java.io.Serializable;
import java.util.Objects;


@Embeddable
public class WorkoutDetailsKey implements Serializable {
    @Column(name = "idWorkout")
    private String idWorkout;

    @Column(name = "idExercise")
    private Integer idExercise;

    @Column(name = "numeroEsercizio")
    private Integer numeroEsercizio;

    public Integer getNumeroEsercizio() {
        return numeroEsercizio;
    }

    public void setNumeroEsercizio(Integer numeroEsercizio) {
        this.numeroEsercizio = numeroEsercizio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkoutDetailsKey that = (WorkoutDetailsKey) o;
        return Objects.equals(idWorkout, that.idWorkout) && Objects.equals(idExercise, that.idExercise) && Objects.equals(numeroEsercizio, that.numeroEsercizio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idWorkout, idExercise, numeroEsercizio);
    }

    public String getIdWorkout() {
        return idWorkout;
    }

    public void setIdWorkout(String idWorkout) {
        this.idWorkout = idWorkout;
    }

    public Integer getIdExercise() {
        return idExercise;
    }

    public void setIdExercise(Integer idExercise) {
        this.idExercise = idExercise;
    }

    @Override
    public String toString() {
        return "WorkoutDetailsKey{" +
                "idWorkout='" + idWorkout + '\'' +
                ", idExercise=" + idExercise +
                ", numeroEsercizio=" + numeroEsercizio +
                '}';
    }
}