package com.example.Vivalgym.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="workoutDetails")
public class WorkoutDetails implements Serializable {

    @EmbeddedId
    private WorkoutDetailsKey idWorkoutDetails = new WorkoutDetailsKey();


    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("idWorkout")
    @JoinColumn(name="idWorkout")
    @JsonBackReference(value="workoutDetails-workout")
    private Workout workout;

    @OneToOne
    @MapsId("idExercise")
    @JoinColumn(name="idExercise")
    private Exercise exercise;

    private String ripetizioniBase;
    private Integer minutiCardio;
    private String Note;
    private Integer tempoRecupero;
    public WorkoutDetailsKey getIdWorkoutDetails() {
        return idWorkoutDetails;
    }
    public void setNumeroEsercizio(Integer numeroEsercizio){
        this.idWorkoutDetails.setNumeroEsercizio(numeroEsercizio);
    }

    public Integer getTempoRecupero() {
        return tempoRecupero;
    }

    public void setTempoRecupero(Integer tempoRecupero) {
        this.tempoRecupero = tempoRecupero;
    }

    public void setIdExercise(Integer idExercise){
        this.idWorkoutDetails.setIdExercise(idExercise);
    }
    public void setIdWorkout(String idWorkout){
        this.idWorkoutDetails.setIdWorkout(idWorkout);
    }
    public void setIdWorkoutDetails(WorkoutDetailsKey idWorkoutDetails) {
        this.idWorkoutDetails = idWorkoutDetails;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }



    public String getRipetizioniBase() {
        return ripetizioniBase;
    }

    public void setRipetizioniBase(String ripetizioniBase) {
        this.ripetizioniBase = ripetizioniBase;
    }

    public Integer getMinutiCardio() {
        return minutiCardio;
    }

    @Override
    public String toString() {
        return "WorkoutDetails{" +
                "idWorkoutDetails=" + idWorkoutDetails.toString() +
                //", workout=" + workout +
                ", exercise=" + exercise +
                ", ripetizioniBase='" + ripetizioniBase + '\'' +
                ", minutiCardio=" + minutiCardio +
                ", Note='" + Note + '\'' +
                '}'; }


    public void setMinutiCardio(Integer minutiCardio) {
        this.minutiCardio = minutiCardio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkoutDetails that = (WorkoutDetails) o;
        return Objects.equals(idWorkoutDetails, that.idWorkoutDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idWorkoutDetails);
    }

    public String getNote() {
        return Note;
    }

    public void setNote(String note) {
        Note = note;
    }
}
