package com.example.performance_management_system.auth.dto;

import com.example.performance_management_system.common.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SignupRequest {

    @NotBlank
    public String username;

    @NotBlank
    public String password;

    @NotNull
    public Role role;

    public Long managerId;
}
