package com.example.performance_management_system.department.repository;


import com.example.performance_management_system.common.enums.DepartmentType;
import com.example.performance_management_system.department.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByType(DepartmentType type);
}
