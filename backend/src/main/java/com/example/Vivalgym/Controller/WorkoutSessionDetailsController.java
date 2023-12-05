package com.example.Vivalgym.Controller;

import com.example.Vivalgym.Model.WorkoutSession;
import com.example.Vivalgym.Model.WorkoutSessionDetails;
import com.example.Vivalgym.Service.WorkoutSessionDetailsService;
import com.example.Vivalgym.Service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class WorkoutSessionDetailsController {
    @Autowired
    private WorkoutSessionDetailsService workoutSessionDetailsService;

    @GetMapping("/workoutSessionDetails")
    public List<WorkoutSessionDetails> getAllWorkoutSessions() {
        return workoutSessionDetailsService.getAllWorkoutSessionDetails();
    }
    @PostMapping("/addworkoutSessionDetails")
    public void addWorkoutSessionDetails(@RequestBody WorkoutSessionDetails workoutSessionDetails) {
        workoutSessionDetailsService.addWorkoutSessionDetails(workoutSessionDetails);
    }
    @PostMapping("/addworkoutSessionDetails/{idWorkoutSession}")
    public void addWorkoutSessionDetailsWorkouId(@PathVariable String idWorkoutSession , @RequestBody WorkoutSessionDetails workoutSessionDetails) {
        workoutSessionDetailsService.addWorkoutSessionDetailsWorkouId(idWorkoutSession,workoutSessionDetails);
    }
}
