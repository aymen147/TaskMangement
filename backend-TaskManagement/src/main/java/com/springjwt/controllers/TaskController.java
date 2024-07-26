package com.springjwt.controllers;

import com.springjwt.entities.Task;
import com.springjwt.entities.User;
import com.springjwt.exceptions.RessourceNotFoundException;
import com.springjwt.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/")

public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    @GetMapping("/tasks")
    private List<Task> getAllTaskOfAuthUser(@RequestParam Long user_id){
        return taskRepository.findAllByUserId(user_id);
    }

    @PostMapping("/tasks")
    private Task CreateTask(@RequestBody Task task){
        LocalDateTime currentDateTime = LocalDateTime.now();
        Instant instant = currentDateTime.atZone(ZoneId.systemDefault()).toInstant();
        Date date = Date.from(instant);
        task.setCreatedAt(date);
        return taskRepository.save(task);
    }
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails){
         Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id :" + id));
        LocalDateTime currentDateTime = LocalDateTime.now();
        Instant instant = currentDateTime.atZone(ZoneId.systemDefault()).toInstant();
        Date date = Date.from(instant);
        task.setUpdateAt(date);
        task.setCreatedAt(taskDetails.getCreatedAt());
        task.setDescription(taskDetails.getDescription());
        task.setTitle(taskDetails.getTitle());
        task.setStatus(taskDetails.getStatus());
        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Map<String,Boolean>> DeleteTask(@PathVariable Long id){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Task not exist with id:"+ id));
        taskRepository.delete(task);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Task not exist with id:"+ id));
        return ResponseEntity.ok(task);
    }

}
