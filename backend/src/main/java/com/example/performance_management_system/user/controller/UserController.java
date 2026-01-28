package com.example.performance_management_system.user.controller;


import com.example.performance_management_system.user.dto.CreateUserRequest;
import com.example.performance_management_system.user.model.User;
import com.example.performance_management_system.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Create user
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody CreateUserRequest request) {
        return service.createUser(
                request.username,
                request.password,
                request.role,
                request.managerId
        );
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return service.getById(id);
    }

    // List all users
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    // Paginated list
    @GetMapping("/page")
    public Page<User> getUsersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.getAllUsersPaginated(page, size);
    }
}