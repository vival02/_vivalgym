package com.example.Vivalgym.Controller;

import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Model.WorkoutDetails;
import com.example.Vivalgym.Model.WorkoutDetailsKey;
import com.example.Vivalgym.Service.WorkoutDetailsService;
import com.example.Vivalgym.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class WorkoutDetailsController {
    @Autowired
    private WorkoutDetailsService workoutDetailsService;
    @PostMapping("/workouts/addexercise/{idWorkout}")
    public void addWorkout(@PathVariable String idWorkout, @RequestBody WorkoutDetails workoutDetails) {
        workoutDetailsService.addExerciseWorkout(workoutDetails,idWorkout);
    }
    @PostMapping("/workouts/addexercisesWorkouts/{idWorkout}")
    public void addExercisesWorkout(@PathVariable String idWorkout, @RequestBody WorkoutDetails[] workoutDetails) {
        workoutDetailsService.addExercisesWorkout(idWorkout,workoutDetails);
    }
    @GetMapping("/workoutDetails/{idWorkout}")
    public Optional<WorkoutDetails[]> getWorkoutDetailsByIdWorkout(@PathVariable String idWorkout) {
        return workoutDetailsService.getWorkoutDetailsByIdWorkout(idWorkout);
    }
    @RequestMapping(value = "/delete-workout-details/{id}", method = RequestMethod.DELETE)
    public void deleteWorkout(@PathVariable WorkoutDetailsKey id) {
        workoutDetailsService.deleteWorkoutSession(id);
    }

}
