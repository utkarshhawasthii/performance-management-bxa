package com.example.performance_management_system.auth.controller;

import com.example.performance_management_system.auth.dto.LoginRequest;
import com.example.performance_management_system.auth.dto.SignupRequest;
import com.example.performance_management_system.config.security.jwt.JwtUtil;
import com.example.performance_management_system.user.model.User;
import com.example.performance_management_system.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public String signup(@Valid @RequestBody SignupRequest request){
        User user = userService.registerUser(
                request.username,
                request.password,
                request.role,
                request.managerId
        );

        return jwtUtil.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole().getName().name()
        );
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest request) {

        User user = userService.getByUsername(request.getUsername());

        // TEMP: plaintext check (hash later)
        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return jwtUtil.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole().getName().name()
        );
    }
}
