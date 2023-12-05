package com.example.Vivalgym.Service;

import com.example.Vivalgym.Exception.ApiRequestException;
import com.example.Vivalgym.Model.*;
import com.example.Vivalgym.Repository.ExerciseRepository;
import com.example.Vivalgym.Repository.WorkoutRepository;
import com.example.Vivalgym.Repository.WorkoutSessionDetailsRepository;
import com.example.Vivalgym.Repository.WorkoutSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service("workoutSessionServiceDetails")
public class WorkoutSessionDetailsService {
    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;
    @Autowired
    private WorkoutSessionDetailsRepository workoutSessionDetailsRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    public List<WorkoutSessionDetails> getAllWorkoutSessionDetails() {
        return workoutSessionDetailsRepository.findAll();
    }
    public void addWorkoutSessionDetails(WorkoutSessionDetails workoutSessionDetails) {
        Optional<WorkoutSession> foundWorkoutSession =workoutSessionRepository.findById(workoutSessionDetails.getWorkoutSession().getIdWorkoutSession());
        Optional<Exercise> foundExercise =exerciseRepository.findById(workoutSessionDetails.getExercise().getIdExercise());

        if(!foundWorkoutSession.isEmpty() && !foundExercise.isEmpty()){
            workoutSessionDetails.setExercise(foundExercise.get());
            workoutSessionDetails.setWorkoutSession(foundWorkoutSession.get());
            System.out.println();
            System.out.println();
            System.out.println("-----------------------"+workoutSessionDetails.toString());
            workoutSessionDetailsRepository.save(workoutSessionDetails);

        }else{
            throw new ApiRequestException("User or exercise not found");
        }

    }

    public void addWorkoutSessionDetailsWorkouId(String idWorkoutSession,WorkoutSessionDetails workoutSessionDetails) {
        Optional<WorkoutSession> foundWorkoutSession =workoutSessionRepository.findById(idWorkoutSession);
        Optional<Exercise> foundExercise =exerciseRepository.findById(workoutSessionDetails.getExercise().getIdExercise());

        if(!foundWorkoutSession.isEmpty() && !foundExercise.isEmpty()){
            workoutSessionDetails.setExercise(foundExercise.get());
            workoutSessionDetails.setWorkoutSession(foundWorkoutSession.get());
          //  workoutSessionDetails.setNumeroEsercizio(0);
            System.out.println();
            System.out.println();
            System.out.println("-----------------------"+workoutSessionDetails.toString());
            workoutSessionDetailsRepository.save(workoutSessionDetails);

        }else{
            throw new ApiRequestException("User or exercise not found");
        }

    }

    public void addWorkoutSessionDetailsSet(Set<WorkoutSessionDetails> workoutSessionDetails) {
        for (WorkoutSessionDetails workoutSessionDetail : workoutSessionDetails) {
            this.addWorkoutSessionDetails(workoutSessionDetail);
        }

    }

}
