package com.example.Vivalgym.Service;

import com.example.Vivalgym.Model.Exercise;
import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Repository.ExerciseRepository;
import com.example.Vivalgym.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("exerciseService")
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {

        return exerciseRepository.findAll();
    }
    public void addExercise(Exercise exercise) {
        exerciseRepository.save(exercise);
    }
}
