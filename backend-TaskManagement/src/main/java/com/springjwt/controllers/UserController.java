package com.springjwt.controllers;

import ch.qos.logback.classic.encoder.JsonEncoder;
import com.springjwt.entities.User;
import com.springjwt.exceptions.RessourceNotFoundException;
import com.springjwt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> DeleteUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("User not exist with id:"+ id));
        userRepository.delete(user);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable Long id){
        User employee = userRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("User not exist with id:"+ id));
        return ResponseEntity.ok(employee);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody User UserDetails){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id :" + id));
        user.setUsername(UserDetails.getUsername());
        user.setEmail(UserDetails.getEmail());
        user.setPassword(passwordEncoder.encode(UserDetails.getPassword()));
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}
