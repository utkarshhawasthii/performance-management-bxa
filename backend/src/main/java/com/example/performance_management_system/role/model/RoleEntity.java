package com.example.performance_management_system.role.model;

import com.example.performance_management_system.common.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "role")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private Role name; // ADMIN, HR, etc.

    @Lob
    private String permissions;

    // getters & setters
}
