package com.example.Vivalgym.Controller;

import com.example.Vivalgym.Model.Exercise;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Model.WorkoutSession;
import com.example.Vivalgym.Model.WorkoutSessionDetails;
import com.example.Vivalgym.Service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class WorkoutSessionController {
    @Autowired
    private WorkoutSessionService workoutSessionService;

    @GetMapping("/workoutSession")
    public List<WorkoutSession> getAllWorkoutSessions() {
        return workoutSessionService.getAllWorkoutSessions();
    }

    @GetMapping("/workoutSessionWithIdUser/{idUser}")
    public Optional<WorkoutSession[]> getAllWorkoutSessionsWithIdUser(@PathVariable String idUser) {
        return workoutSessionService.getAllWorkoutSessionsWithIdUser(idUser);
    }
    @PostMapping("/workoutSession")
    public void addWorkoutSession(@RequestBody WorkoutSession workoutSession) {
        //System.out.println(exercise.toString());
        workoutSessionService.addWorkoutSession(workoutSession);
    }
    @PostMapping("/workoutSession/{idWorkout}")
    public void addWorkoutSessionWithId(@PathVariable String idWorkout , @RequestBody WorkoutSession workoutSession) {
        //System.out.println(exercise.toString());
        workoutSessionService.addWorkoutSessionWithId(idWorkout,workoutSession);
    }

    @PostMapping("/add-workout-session-and-details")
    public void addWorkoutAndExercise(@RequestBody WorkoutSession workoutSession ) {
        System.out.println("-------- ok" +workoutSession.getDataSvolgimento());
        Set<WorkoutSessionDetails> workoutSessionDetails = workoutSession.getWorkoutSessionDetails();
        workoutSessionService.addWorkoutSession(workoutSession);
    }

    @PostMapping("/addworkoutsessionanddetailsId")
    public String addWorkoutAndExerciseWithId(@RequestBody WorkoutSession workoutSession ) {
        Set<WorkoutSessionDetails> workoutSessionDetails = workoutSession.getWorkoutSessionDetails();
        return  workoutSessionService.addWorkoutSession(workoutSession);
    }
}
