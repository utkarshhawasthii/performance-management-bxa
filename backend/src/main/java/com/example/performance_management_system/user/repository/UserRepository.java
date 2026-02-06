package com.example.performance_management_system.user.repository;

import com.example.performance_management_system.common.enums.Role;
import com.example.performance_management_system.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
        SELECT u
        FROM User u
        WHERE u.active = true
          AND u.role.name = 'EMPLOYEE'
    """)
    List<User> findAllActiveEmployees();

    Optional<User> findByEmail(String email);
    List<User> findByRole(Role name);


    List<User> findByManagerId(Long managerId);
}
