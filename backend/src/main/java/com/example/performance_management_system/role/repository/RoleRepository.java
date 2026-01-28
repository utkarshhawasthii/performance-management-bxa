package com.example.performance_management_system.role.repository;

import com.example.performance_management_system.role.model.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, com.example.performance_management_system.common.enums.Role> {
}

