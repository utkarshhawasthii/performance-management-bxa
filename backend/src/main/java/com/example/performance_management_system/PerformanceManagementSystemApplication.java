package com.example.performance_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class PerformanceManagementSystemApplication {

	public static void main(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("Admin@123"));
		SpringApplication.run(PerformanceManagementSystemApplication.class, args);
	}

}
