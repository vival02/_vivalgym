package com.example.Vivalgym.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import jakarta.persistence.*;

@Entity
@Table(name="workoutSessionDetails")
public class WorkoutSessionDetails {

    @EmbeddedId
    private WorkoutSessionDetailsKey idWorkoutSessionDetails = new WorkoutSessionDetailsKey();;

    @ManyToOne(cascade=CascadeType.ALL)
    @MapsId("idWorkoutSession")
    @JoinColumn(name="idWorkoutSession")
    @JsonBackReference(value="workoutSession-workoutSessionDetails")
    private WorkoutSession workoutSession;

    @OneToOne
    @MapsId("idExercise")
    @JoinColumn(name="idExercise")
    // @JsonBackReference
    private Exercise exercise;

    @Column(columnDefinition = "json")
    private String ripetizionixkg;


    private Integer minutiCardio;



    public WorkoutSessionDetails() {

    }


    public WorkoutSessionDetailsKey getIdWorkoutSessionDetails() {
        return idWorkoutSessionDetails;
    }

    public void setIdWorkoutSessionDetails(WorkoutSessionDetailsKey idWorkoutSessionDetails) {
        this.idWorkoutSessionDetails = idWorkoutSessionDetails;
    }
    public void setNumeroEsercizio(Integer numeroEsercizio){
        this.idWorkoutSessionDetails.setNumeroEsercizio(numeroEsercizio);
    }

    public WorkoutSession getWorkoutSession() {
        return workoutSession;
    }

    public void setWorkoutSession(WorkoutSession workoutSession) {
        this.workoutSession = workoutSession;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public String getRipetizionixkg() {
        return ripetizionixkg;
    }

    public void setRipetizionixkg(String ripetizionixkg) {
        this.ripetizionixkg = ripetizionixkg;
    }

    public Integer getMinutiCardio() {
        return minutiCardio;
    }

    public void setMinutiCardio(Integer minutiCardio) {
        this.minutiCardio = minutiCardio;
    }

    @Override
    public String toString() {
        return "WorkoutSessionDetails{" +
                "idWorkoutSessionDetails=" + idWorkoutSessionDetails +
                ", workoutSession=" + workoutSession +
                ", exercise=" + exercise +
                ", minutiCardio=" + minutiCardio +
                '}';
    }

}
