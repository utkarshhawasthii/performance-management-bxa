package com.example.performance_management_system.keyresult.controller;

import com.example.performance_management_system.keyresult.dto.KeyResultResponse;
import com.example.performance_management_system.keyresult.dto.UpdateKeyResultProgressRequest;
import com.example.performance_management_system.keyresult.model.KeyResult;
import com.example.performance_management_system.keyresult.service.KeyResultService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/key-results")
public class KeyResultController {

    private final KeyResultService service;

    public KeyResultController(KeyResultService service) {
        this.service = service;
    }

    @PatchMapping("/{id}/progress")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public KeyResultResponse updateProgress(
            @PathVariable Long id,
            @Valid @RequestBody UpdateKeyResultProgressRequest request
    ) {
        KeyResult kr = service.updateProgress(id, request.currentValue);

        // map entity → response
        KeyResultResponse dto = new KeyResultResponse();
        dto.id = kr.getId();
        dto.metric = kr.getMetric();
        dto.targetValue = kr.getTargetValue();
        dto.currentValue = kr.getCurrentValue();

        return dto;
    }
}
