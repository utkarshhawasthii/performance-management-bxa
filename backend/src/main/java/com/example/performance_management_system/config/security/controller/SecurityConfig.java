package com.example.performance_management_system.config.security.controller;

import com.example.performance_management_system.config.security.filter.JwtAuthenticationFilter;
import com.example.performance_management_system.config.security.jwt.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtUtil jwtUtil) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        new JwtAuthenticationFilter(jwtUtil),
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @RestController
    @RequestMapping("/api/auth")
    public static class AuthController {

        private final JwtUtil jwtUtil;

        public AuthController(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }

        @PostMapping("/login")
        public String login(@RequestParam Long userId,
                            @RequestParam String username,
                            @RequestParam String role) {

            // Later: validate user from DB
            return jwtUtil.generateToken(userId, username, role);
        }
    }
}
