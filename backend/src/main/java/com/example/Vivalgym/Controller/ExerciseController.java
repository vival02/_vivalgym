package com.example.Vivalgym.Controller;

import com.example.Vivalgym.Model.Exercise;
import com.example.Vivalgym.Model.ExerciseTypes;
import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Service.ExerciseService;
import com.example.Vivalgym.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/exercises")
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }
    @PostMapping("/exercise")
    public void addExercise(@RequestBody Exercise exercise) {
        System.out.println(exercise.toString());
        exerciseService.addExercise(exercise);
    }
    @GetMapping("/exercise-types")
    public List<ExerciseTypes> getAllExerciseTypes() {
        return exerciseService.getAllExerciseTypes();
    }
}
