package com.example.Vivalgym.Repository;

import com.example.Vivalgym.Model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise,Integer> {
}
