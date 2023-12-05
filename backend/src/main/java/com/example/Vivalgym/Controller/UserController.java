package com.example.Vivalgym.Controller;

import com.example.Vivalgym.Exception.ApiRequestException;
import com.example.Vivalgym.Model.LoginData;
import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Model.Workout;
import com.example.Vivalgym.Service.UserService;
import com.example.Vivalgym.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private WorkoutService workoutService;
    @GetMapping("/login")
    public User Login(  @RequestParam(value="email") String email, @RequestParam(value="password") String password) {

        return userService.findUserByEmailAndPassword(email,password);
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/users/workouts/{id}")
    public Optional<Workout[]> getUseWorkouts(@PathVariable Integer id) {

        //System.out.println("----------------------"+user.toString());
        return workoutService.getWorkoutsByidUser(id);
    }


    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getUser(id);
    }

    @PostMapping("/users")
    //Alternativamente
    //@RequestMapping(value = "/patient", method = RequestMethod.POST)
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public void updateUser(@PathVariable Integer id, @RequestBody User user) {
        userService.updateUser(id, user);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @GetMapping(value = "/user")
    public Optional<User> findUserByName(@RequestParam(value="nome") String nome) {
        return userService.findUserByNome(nome);
    }
}
