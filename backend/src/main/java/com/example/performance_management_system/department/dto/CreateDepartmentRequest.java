package com.example.performance_management_system.department.dto;

import com.example.performance_management_system.common.enums.DepartmentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateDepartmentRequest {

    @NotNull(message = "Department type is required")
    public DepartmentType type;

    @NotBlank(message = "Display name is required")
    public String displayName;

    public Long headId;
}
