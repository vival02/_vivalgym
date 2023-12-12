package com.example.Vivalgym.Service;

import com.example.Vivalgym.Exception.ApiException;
import com.example.Vivalgym.Exception.ApiRequestException;
import com.example.Vivalgym.Model.Exercise;
import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Model.WorkoutDetails;
import com.example.Vivalgym.Repository.ExerciseRepository;
import com.example.Vivalgym.Repository.UserRepository;
import com.example.Vivalgym.Repository.WorkoutDetailsRepository;
import com.example.Vivalgym.Repository.WorkoutRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service("workoutService")
@Transactional
public class WorkoutService {
    @Autowired
    private WorkoutRepository workoutRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WorkoutDetailsRepository workoutDetailsRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    public List<Workout> getAllWorkouts() {

        return workoutRepository.findAll();
    }
    public Optional<Workout[]> getWorkoutsByidUser(Integer idUser) {

        return workoutRepository.findWorkoutByUser(idUser);
    }
public String getNextKey(Workout workout){
    Optional<User> foundUser =userRepository.findById(workout.getUser().getIdUser());
    Integer lengthWorkout = foundUser.get().getLengthWorkout()+1;
    String idWorkout = foundUser.get().getIdUser() + "_" + lengthWorkout;
    return idWorkout;
}
    public void addWorkout(Workout workout) {

        Optional<User> foundUser =userRepository.findById(workout.getUser().getIdUser());

        if(!foundUser.isEmpty()){
            Integer lengthWorkout = foundUser.get().getLengthWorkout()+1;
            String idWorkout = foundUser.get().getIdUser() + "_" + lengthWorkout;
            workout.setIdWorkout(idWorkout);
            workout.setUser(foundUser.get());
            workoutRepository.save(workout);
        }else{
            throw new ApiRequestException("User not found");
        }

    }
    public String addWorkoutKey(Workout workout) {
        String idWorkout = null;
        Integer lengthWorkout = 0;
        Optional<User> foundUser =userRepository.findById(workout.getUser().getIdUser());
        if(!workoutRepository.findTopByOrderByIdWorkoutDescMyQuery().isEmpty()){
            String lastKey =workoutRepository.findTopByOrderByIdWorkoutDescMyQuery().get();
             lengthWorkout = Integer.parseInt(lastKey.substring(lastKey.indexOf('_')+1,lastKey.length()));
        }

        if(!foundUser.isEmpty()){
          //  Integer lengthWorkout = foundUser.get().getLengthWorkout()+1;
            lengthWorkout++;
             idWorkout = foundUser.get().getIdUser() + "_" + lengthWorkout;
            workout.setIdWorkout(idWorkout);
            workout.setUser(foundUser.get());
            workoutRepository.save(workout);
        }else{
            throw new ApiRequestException("User not found");
        }
        return idWorkout;
    }

    public void deleteWorkout(String id) {
        workoutRepository.deleteById(id);
    }
    public Optional<Workout> getWorkoutsByIdWorkout(String idWorkout) {

        return workoutRepository.findWorkoutByIdWorkout(idWorkout);
    }

    public void updateWorkout(String idWorkout, Workout workout) {
        Optional<User> foundUser =userRepository.findById(Integer.parseInt(idWorkout.substring(0,idWorkout.indexOf("_"))));

        if(!foundUser.isEmpty()){
            workout.setIdWorkout(idWorkout);
            workout.setUser(foundUser.get());
            workoutRepository.save(workout);
        }else{
            throw new ApiRequestException("User not found");
        }
    }

    public void updateWorkoutComplete(String idWorkout, Workout workoutModificato) {
        Optional<User> foundUser =userRepository.findById(Integer.parseInt(idWorkout.substring(0,idWorkout.indexOf("_"))));
        Optional<Workout> foundWorkout =workoutRepository.findById(idWorkout);

        if(!foundUser.isEmpty() && !foundWorkout.isEmpty()){
            Set<WorkoutDetails> foundWorkoutDetails = foundWorkout.get().getWorkoutDetails();
            Set<WorkoutDetails> foundWorkoutDetailsModify = workoutModificato.getWorkoutDetails();
            boolean trovato = false;

            WorkoutDetails  workoutDetailsModify;
            int i =0;
            for (WorkoutDetails workoutDetails:foundWorkoutDetails) {
                Iterator iterator = foundWorkoutDetailsModify.iterator();
                trovato = false;

                while(iterator.hasNext() && !trovato ) {
                    i++;
                    workoutDetailsModify= (WorkoutDetails) iterator.next();
                    workoutDetailsModify.setIdExercise(workoutDetailsModify.getExercise().getIdExercise());
                    workoutDetailsModify.setIdWorkout(idWorkout);
                    if(workoutDetails.equals(workoutDetailsModify)){
                         trovato = true;
                    }

                }
                if(!trovato){

                    workoutDetailsRepository.deleteByIdMyQuery(workoutDetails.getIdWorkoutDetails());
                }

            }
            workoutModificato.setIdWorkout(idWorkout);
            workoutModificato.setUser(foundUser.get());
            workoutRepository.save(workoutModificato);
        }else{
            throw new ApiRequestException("User not found");
        }
    }
}
