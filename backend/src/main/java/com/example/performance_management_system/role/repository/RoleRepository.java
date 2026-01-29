package com.example.performance_management_system.role.repository;

import com.example.performance_management_system.common.enums.Role;
import com.example.performance_management_system.role.model.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    Optional<RoleEntity> findByName(Role name);
}
