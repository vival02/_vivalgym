package com.example.Vivalgym.Controller;

import com.example.Vivalgym.Model.Exercise;
import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Model.WorkoutDetails;
import com.example.Vivalgym.Repository.WorkoutRepository;
import com.example.Vivalgym.Service.WorkoutDetailsService;
import com.example.Vivalgym.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;
    @Autowired
    private WorkoutDetailsService workoutDetailsService;
    private Set<WorkoutDetails> exercises;
    private WorkoutDetails exercise = new WorkoutDetails();

    @GetMapping("/workouts")
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    @GetMapping("/workouts/{idUser}")
    public Optional<Workout[]> getAllWorkouts(@PathVariable Integer idUser) {
        return workoutService.getWorkoutsByidUser(idUser);
    }

    @Autowired
    private WorkoutRepository workoutRepository;

    @PostMapping("/add-workout-and-exercise")
    public void addWorkoutAndExercise(@RequestBody Workout workout) {

        exercises = workout.getWorkoutDetails();

        System.out.println("ESERCIZIO  -----------------" + exercise.toString());

        String idWorkout = workoutService.addWorkoutKey(workout);

        //  workoutDetailsService.addExercisesWorkout(idWorkout,exercises);
    }

    /*    @PostMapping("/add-workout-and-exercise/{idUser}")
     public void addWorkoutAndExercise(@PathVariable Integer idUser, @RequestBody Workout workout,@RequestBody WorkoutDetails[] exercises) {
         String idWorkout = workoutService.addWorkoutKey(workout);
         workoutDetailsService.addExercisesWorkout(idWorkout,exercises);
     }*/
    @GetMapping("/workout/{idWorkout}")
    public Optional<Workout> getWorkoutByIdWorkout(@PathVariable String idWorkout) {
        return workoutService.getWorkoutsByIdWorkout(idWorkout);
    }

    @RequestMapping(value = "/delete-workout/{id}", method = RequestMethod.DELETE)
    public void deleteWorkout(@PathVariable String id) {
        workoutService.deleteWorkout(id);
    }

    @RequestMapping(value = "/update-workout/{id}", method = RequestMethod.PUT)
    public void updateWorkout(@PathVariable String id, @RequestBody Workout workout) {
        // workoutService.updateWorkout(id,workout);
        workoutService.updateWorkoutComplete(id, workout);
    }

}
