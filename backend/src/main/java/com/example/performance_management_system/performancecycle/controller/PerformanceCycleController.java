package com.example.performance_management_system.performancecycle.controller;

import com.example.performance_management_system.performancecycle.dto.CreatePerformanceCycleRequest;
import com.example.performance_management_system.performancecycle.model.PerformanceCycle;
import com.example.performance_management_system.performancecycle.service.PerformanceCycleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/performance-cycles")
public class PerformanceCycleController {

    private final PerformanceCycleService service;

    public PerformanceCycleController(PerformanceCycleService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    @PostMapping
    public PerformanceCycle create(@RequestBody CreatePerformanceCycleRequest req) {

        PerformanceCycle cycle = new PerformanceCycle();
        cycle.setName(req.name);
        cycle.setCycleType(req.cycleType);
        cycle.setStartDate(req.startDate);
        cycle.setEndDate(req.endDate);
        cycle.setCreatedBy("HR_ADMIN"); // later from security context

        return service.createCycle(cycle);
    }

    @PreAuthorize("hasRole('HR')")
    @PostMapping("/{id}/start")
    public PerformanceCycle start(@PathVariable Long id) {
        return service.startCycle(id);
    }

    @PreAuthorize("hasRole('HR')")
    @PostMapping("/{id}/close")
    public PerformanceCycle close(@PathVariable Long id) {
        return service.closeCycle(id);
    }
}
