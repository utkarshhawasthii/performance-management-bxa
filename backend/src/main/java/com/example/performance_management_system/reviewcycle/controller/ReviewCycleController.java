package com.example.performance_management_system.reviewcycle.controller;

import com.example.performance_management_system.reviewcycle.dto.CreateReviewCycleRequest;
import com.example.performance_management_system.reviewcycle.model.ReviewCycle;
import com.example.performance_management_system.reviewcycle.service.ReviewCycleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review-cycles")
@PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
public class ReviewCycleController {

    private final ReviewCycleService service;

    public ReviewCycleController(ReviewCycleService service) {
        this.service = service;
    }

    // 🔹 CREATE (DRAFT)
    @PostMapping
    public ReviewCycle create(
            @RequestBody CreateReviewCycleRequest request
    ) {
        ReviewCycle cycle = new ReviewCycle();
        cycle.setName(request.name);
        cycle.setSelfReviewEnabled(request.selfReviewEnabled);
        cycle.setManagerReviewEnabled(request.managerReviewEnabled);
        cycle.setStartDate(request.startDate);
        cycle.setEndDate(request.endDate);

        return service.create(cycle);
    }

    @PostMapping("/{id}/activate")
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    public ReviewCycle activate(@PathVariable Long id) {
        return service.activate(id);
    }

    @PostMapping("/{id}/close")
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    public ReviewCycle close(@PathVariable Long id) {
        return service.close(id);
    }

    // 🔹 LIST (HR dashboard)
    @GetMapping
    public List<ReviewCycle> list() {
        return service.getAll();
    }
}
