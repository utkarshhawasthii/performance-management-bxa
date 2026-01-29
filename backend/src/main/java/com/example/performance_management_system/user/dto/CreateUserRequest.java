package com.example.performance_management_system.user.dto;

import com.example.performance_management_system.common.enums.DepartmentType;
import com.example.performance_management_system.common.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateUserRequest {

    @NotBlank
    public String username;

    @Email
    @NotBlank
    public String email;

    @NotBlank
    public String password;

    @NotNull
    public Role role; // enum

    @NotNull
    public DepartmentType departmentType;

    public String departmentDisplayName;

    public Long managerId;
}

