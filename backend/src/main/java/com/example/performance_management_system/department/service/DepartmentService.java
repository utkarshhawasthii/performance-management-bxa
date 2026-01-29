package com.example.performance_management_system.department.service;

import com.example.performance_management_system.common.enums.DepartmentType;
import com.example.performance_management_system.department.dto.CreateDepartmentRequest;
import com.example.performance_management_system.department.model.Department;
import com.example.performance_management_system.department.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public Department getOrCreate(
            DepartmentType type,
            String displayName,
            Long headId
    ) {
        return repository.findByType(type)
                .orElseGet(() -> {
                    Department dept = new Department();
                    dept.setType(type);
                    dept.setDisplayName(
                            displayName != null ? displayName : type.name()
                    );
                    dept.setHeadId(headId);
                    dept.setActive(true);
                    return repository.save(dept);
                });
    }
}

