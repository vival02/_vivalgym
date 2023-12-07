package com.example.Vivalgym.Model;

import jakarta.persistence.*;

import java.security.PrivateKey;
import java.time.LocalDate;

@Entity
@Table(name="exerciseTypes")
public class ExerciseTypes {
    @Id
    private String gruppoMuscolare;
    private String immagine;

    public String getGruppoMuscolare() {
        return gruppoMuscolare;
    }

    public void setGruppoMuscolare(String nomeMuscolo) {
        this.gruppoMuscolare = nomeMuscolo;
    }

    public String getImmagine() {
        return immagine;
    }

    public void setImmagine(String immagine) {
        this.immagine = immagine;
    }
}