package com.example.Vivalgym.Service;

import com.example.Vivalgym.Exception.ApiRequestException;
import com.example.Vivalgym.Model.*;
import com.example.Vivalgym.Repository.WorkoutRepository;
import com.example.Vivalgym.Repository.WorkoutSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service("workoutSessionService")
public class WorkoutSessionService {
    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;
    @Autowired
    private WorkoutRepository workoutRepository;
    public List<WorkoutSession> getAllWorkoutSessions() {
        return workoutSessionRepository.findAll();
    }
    public String addWorkoutSession(WorkoutSession workoutsession) {
        Optional<Workout> foundWorkout =workoutRepository.findById(workoutsession.getWorkout().getIdWorkout());

        if(!foundWorkout.isEmpty()){
            System.out.println("wwwwwwwwwwwwwwwwwwww" +workoutsession.getIdWorkoutSession());
            workoutsession.setWorkout(foundWorkout.get());
            workoutsession.setIdWorkoutSession(workoutSessionKey(foundWorkout.get()));

            workoutSessionRepository.save(workoutsession);
        }else{
            throw new ApiRequestException("User or exercise not found");
        }
        return workoutSessionKey(foundWorkout.get());
    }

    public String workoutSessionKey( Workout workout){
        Integer lengthWorkoutSession = workout.getLengthWorkoutSession()+1;
        return  workout.getIdWorkout() + "_" + lengthWorkoutSession;
    }
    public String addWorkoutSessionWithId(String idWorkout, WorkoutSession workoutSession) {
       Optional<Workout> foundWorkout =workoutRepository.findById(idWorkout);
        Set<WorkoutSessionDetails> workoutSessionDetails ;
        if(!foundWorkout.isEmpty()){

            workoutSession.setWorkout(foundWorkout.get());
            workoutSession.setIdWorkoutSession(workoutSessionKey(foundWorkout.get()));
           /* workoutSessionDetails = workoutSession.getWorkoutSessionDetails();
            for (WorkoutSessionDetails workoutSessionDetail: workoutSessionDetails) {
                workoutSessionDetail.setNumeroEsercizio();
            }*/
            
            workoutSessionRepository.save(workoutSession);
        }else{
            throw new ApiRequestException("User or exercise not found");
        }

        return workoutSessionKey(foundWorkout.get());

    }

    public Optional<WorkoutSession[]> getAllWorkoutSessionsWithIdUser(String idUser) {

            return workoutSessionRepository.getAllWorkoutSessionsWithIdUser(idUser);
    }
}
