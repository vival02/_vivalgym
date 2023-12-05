package com.example.Vivalgym.Service;

import com.example.Vivalgym.Exception.ApiRequestException;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Model.WorkoutDetails;
import com.example.Vivalgym.Model.WorkoutDetailsKey;
import com.example.Vivalgym.Repository.ExerciseRepository;
import com.example.Vivalgym.Repository.WorkoutDetailsRepository;
import com.example.Vivalgym.Repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service("workoutDetailsService")
public class WorkoutDetailsService {
    @Autowired
    private WorkoutDetailsRepository workoutDetailsRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private WorkoutRepository workoutRepository;
    public void addExerciseWorkout(WorkoutDetails workoutDetails, String idWorkout) {
        System.out.println(workoutDetails.toString());
        //Optional<Exercise> foundExercise =exerciseRepository.findById(workoutDetails.getExercise().getIdExercise());!foundExercise.isEmpty()  &&&&
        Optional<Workout> foundWorkout =workoutRepository.findById(idWorkout);
        if( !foundWorkout.isEmpty()){

            workoutDetails.setWorkout(foundWorkout.get());
          //  workoutDetails.setExercise(foundExercise.get());
            workoutDetailsRepository.save(workoutDetails);
        }else{
            throw new ApiRequestException("Workout not found");
        }

    }

        public void addExercisesWorkout(String idWorkout, Set<WorkoutDetails> workoutDetails) {

        for(WorkoutDetails  exercise : workoutDetails){
            addExerciseWorkout(exercise,idWorkout);
        }

    }
    public void addExercisesWorkout(String idWorkout, WorkoutDetails[] workoutDetails) {
        for(WorkoutDetails  exercise : workoutDetails){
            addExerciseWorkout(exercise,idWorkout);
        }

    }

    public Optional<WorkoutDetails[]> getWorkoutDetailsByIdWorkout(String idWorkout) {
        return workoutDetailsRepository.findWorkoutDetailsByIdWorkout(idWorkout);

    }

    public void deleteWorkoutSession(WorkoutDetailsKey id) {
        workoutDetailsRepository.deleteById(id);
    }
}
