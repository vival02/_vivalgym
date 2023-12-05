package com.example.Vivalgym.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="workout")
public class Workout implements Serializable {
    @Id
    private String idWorkout;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="idUser")
    @JsonBackReference(value="user-workout")

    private User user;
    private String nome;
    private String Note;


    @OneToMany(mappedBy = "workout",cascade = {CascadeType.ALL},fetch = FetchType.LAZY)
    @JsonManagedReference(value="workoutSession-workout")
    private Set<WorkoutSession> workoutSession= new HashSet<>();

    @OneToMany(mappedBy = "workout",cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JsonManagedReference(value="workoutDetails-workout")
    private Set<WorkoutDetails> workoutDetails= new HashSet<>();

    public Set<WorkoutDetails> getWorkoutDetails() {
        return workoutDetails;
    }

    public void setWorkoutDetails(Set<WorkoutDetails> workoutDetails) {
        this.workoutDetails = workoutDetails;
    }

    public Set<WorkoutSession> getWorkoutSession() {
        return workoutSession;
    }
    public int getLengthWorkoutSession(){

            return this.getWorkoutSession().size();


    }
    public void setWorkoutSession(Set<WorkoutSession> workoutSession) {
        this.workoutSession = workoutSession;
    }

    public String getIdWorkout() {
        return idWorkout;
    }

    public void setIdWorkout(String idWorkout) {
        this.idWorkout = idWorkout;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNote() {
        return Note;
    }

    public void setNote(String note) {
        Note = note;
    }

    @Override
    public String toString() {
        return "Workout{" +
                "idWorkout='" + idWorkout + '\'' +
                ", nome='" + nome + '\'' +
                ", Note='" + Note + '\'' +
                ", workoutSession=" + workoutSession +
                ", workoutDetails=" + workoutDetails +
                '}';
    }
}
