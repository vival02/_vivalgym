package com.example.Vivalgym.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="workoutSession")
public class WorkoutSession {
    @Id
    private String idWorkoutSession;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="idWorkout")
    @JsonBackReference(value="workoutSession-workout")
    private Workout workout;
    @OneToMany(mappedBy = "workoutSession",cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JsonManagedReference(value="workoutSession-workoutSessionDetails")
    private Set<WorkoutSessionDetails> workoutSessionDetails;

    public Date dataSvolgimento ;

    public String statoSvolgimento;

    public WorkoutSession(String idWorkoutSession, Workout workout, Date dataSvolgimento, String statoSvolgimento) {
        this.idWorkoutSession = idWorkoutSession;
        this.workout = workout;
        this.dataSvolgimento = dataSvolgimento;
        this.statoSvolgimento = statoSvolgimento;
    }

    public WorkoutSession() {
    }

    public Set<WorkoutSessionDetails> getWorkoutSessionDetails() {
        return workoutSessionDetails;
    }

    public void setWorkoutSessionDetails(Set<WorkoutSessionDetails> workoutSessionDetails) {
        this.workoutSessionDetails = workoutSessionDetails;
    }

    public String getIdWorkoutSession() {
        return idWorkoutSession;
    }

    public void setIdWorkoutSession(String idWorkoutSession) {
        this.idWorkoutSession = idWorkoutSession;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public Date getDataSvolgimento() {
        return dataSvolgimento;
    }

    public void setDataSvolgimento(Date dataSvolgimento) {
        this.dataSvolgimento = dataSvolgimento;
    }

    public String getStatoSvolgimento() {
        return statoSvolgimento;
    }

    public void setStatoSvolgimento(String statoSvolgimento) {
        this.statoSvolgimento = statoSvolgimento;
    }

    @Override
    public String toString() {
        return "WorkoutSession{" +
                "idWorkoutSession='" + idWorkoutSession + '\'' +
               // ", workout=" + workout +
             //   ", workoutSessionDetails=" + workoutSessionDetails +
                ", dataSvolgimento=" + dataSvolgimento +
                ", statoSvolgimento='" + statoSvolgimento + '\'' +
                '}';
    }
}