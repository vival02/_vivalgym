package com.example.Vivalgym.Repository;

import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {


    public Optional<User> findByNome(String nome);
    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
