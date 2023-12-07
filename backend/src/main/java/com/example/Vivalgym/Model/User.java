package com.example.Vivalgym.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(generator = "user_gen",strategy=GenerationType.IDENTITY)
    @SequenceGenerator(name = "user_gen",sequenceName = "user_seq",initialValue =1, allocationSize = 1)
    private Integer idUser;

    private String nome;
    private String cognome;
    private LocalDate dataDiNascita;
    @NaturalId
    private String email;
    private String password;
    @OneToMany(mappedBy = "user",cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JsonManagedReference(value="user-workout")
    private Set<Workout> workouts= new HashSet<>();

    public User(Integer idUser, String nome, String cognome, LocalDate dataDiNascita, Set<Workout> workouts) {
        this.idUser = idUser;
        this.nome = nome;
        this.cognome = cognome;
        this.dataDiNascita = dataDiNascita;
        this.workouts = workouts;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "idUser=" + idUser +
                ", nome='" + nome + '\'' +
                ", cognome='" + cognome + '\'' +
                ", dataDiNascita=" + dataDiNascita +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", workouts=" + workouts +
                '}';
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public LocalDate getDataDiNascita() {
        return dataDiNascita;
    }

    public void setDataDiNascita(LocalDate dataDiNascita) {
        this.dataDiNascita = dataDiNascita;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public int getLengthWorkout(){
        if(this.getWorkouts()== null){
            return 0;
        }else{
            return this.getWorkouts().size();
        }

    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }

}
