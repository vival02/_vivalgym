package com.example.Vivalgym.Service;

import com.example.Vivalgym.Model.User;
import com.example.Vivalgym.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("userService")
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public User findUserByEmailAndPassword(String email,String password) {
        Optional<User> user = this.userRepository.findOneByEmailAndPassword(email,password);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public User getUser(Integer id) {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }
    public void addUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(Integer id, User user) {
        Optional<User> foundUser = userRepository.findById(id);
        if (foundUser.isPresent()) {
            userRepository.save(user);
        }
    }
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
    public Optional<User> findUserByNome(String nome) {

        return userRepository.findByNome(nome);
    }
}
