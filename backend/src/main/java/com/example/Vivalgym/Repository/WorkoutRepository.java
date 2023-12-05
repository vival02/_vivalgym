package com.example.Vivalgym.Repository;

import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Service.UserService;
import com.example.Vivalgym.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout,String> {
    @Query("select p from Workout p where p.user.idUser = ?1 ")
    public Optional<Workout[]> findWorkoutByUser (Integer idUser);
 Optional<Workout> findTopByOrderByIdWorkoutDesc();

 @Query(value="select id_workout from Workout order by SUBSTRING(id_workout,POSITION('_' IN id_workout)+1 ,LENGTH(id_workout)) +0 desc LIMIT 1", nativeQuery = true)
    Optional<String> findTopByOrderByIdWorkoutDescMyQuery();
    Optional<Workout> findWorkoutByIdWorkout(String idWorkout);

}
