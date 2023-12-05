package com.example.Vivalgym.Repository;

import com.example.Vivalgym.Model.WorkoutSession;
import com.example.Vivalgym.Model.WorkoutSessionDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutSessionDetailsRepository  extends JpaRepository<WorkoutSessionDetails,String> {

}
