package com.example.performance_management_system.keyresult.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class UpdateKeyResultProgressRequest {

    @NotNull
    @PositiveOrZero
    public Double currentValue;
}
