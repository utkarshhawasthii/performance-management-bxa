package com.example.performance_management_system.review.controller;

import com.example.performance_management_system.config.security.SecurityUtil;
import com.example.performance_management_system.review.dto.SubmitReviewRequest;
import com.example.performance_management_system.review.model.Review;
import com.example.performance_management_system.review.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    // 🔹 Employee submits self review
    @PostMapping("/{id}/self")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Review submitSelfReview(
            @PathVariable Long id,
            @Valid @RequestBody SubmitReviewRequest request
    ) {
        return service.submitSelfReview(id, request.comments);
    }

    // 🔹 Manager submits manager review
    @PostMapping("/{id}/manager")
    @PreAuthorize("hasRole('MANAGER')")
    public Review submitManagerReview(
            @PathVariable Long id,
            @Valid @RequestBody SubmitReviewRequest request
    ) {
        return service.submitManagerReview(id, request.comments);
    }

    // 🔹 Manager fetches reviews
    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER')")
    public Page<Review> getManagerReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.getReviewsForManager(
                SecurityUtil.userId(),
                page,
                size
        );
    }

}

