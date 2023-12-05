package com.example.Vivalgym.Repository;

import com.example.Vivalgym.Exception.ApiRequestException;
import com.example.Vivalgym.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutDetailsRepository extends JpaRepository<WorkoutDetails, WorkoutDetailsKey> {
    @Query("select p from WorkoutDetails p where p.workout.idWorkout = ?1 ")
    Optional<WorkoutDetails[]> findWorkoutDetailsByIdWorkout(String idWorkout);

    @Modifying
    @Query("delete from WorkoutDetails b where b.idWorkoutDetails = ?1")
    void deleteByIdMyQuery(WorkoutDetailsKey id);
}
