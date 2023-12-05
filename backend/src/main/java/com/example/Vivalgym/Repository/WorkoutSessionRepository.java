package com.example.Vivalgym.Repository;

import com.example.Vivalgym.Model.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession,String> {
    @Query(value="select * from workout_session WHERE (SUBSTRING(id_workout_session,1,POSITION('_' IN id_workout_session)-1) = ?1)", nativeQuery = true)
    Optional<WorkoutSession[]> getAllWorkoutSessionsWithIdUser(String idUser);


}
