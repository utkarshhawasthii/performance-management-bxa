package com.example.performance_management_system.reviewcycle.service;

import com.example.performance_management_system.common.error.ErrorCode;
import com.example.performance_management_system.common.exception.BusinessException;
import com.example.performance_management_system.goal.model.Goal;
import com.example.performance_management_system.goal.repository.GoalRepository;
import com.example.performance_management_system.keyresult.model.KeyResult;
import com.example.performance_management_system.performancecycle.service.PerformanceCycleService;
import com.example.performance_management_system.rating.model.Rating;
import com.example.performance_management_system.rating.model.RatingStatus;
import com.example.performance_management_system.rating.repository.RatingRepository;
import com.example.performance_management_system.review.model.Review;
import com.example.performance_management_system.review.repository.ReviewRepository;
import com.example.performance_management_system.reviewcycle.model.ReviewCycle;
import com.example.performance_management_system.reviewcycle.repository.ReviewCycleRepository;
import com.example.performance_management_system.user.model.User;
import com.example.performance_management_system.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewCycleService {

    private final ReviewCycleRepository repository;
    private final PerformanceCycleService performanceCycleService;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;
    private final GoalRepository goalRepository;

    public ReviewCycleService(
            ReviewCycleRepository repository,
            PerformanceCycleService performanceCycleService,
            UserRepository userRepository,
            ReviewRepository reviewRepository,
            RatingRepository ratingRepository,
            GoalRepository goalRepository
    ) {
        this.repository = repository;
        this.performanceCycleService = performanceCycleService;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.ratingRepository = ratingRepository;
        this.goalRepository = goalRepository;
    }

    /* ================= CREATE ================= */

    @Transactional
    public ReviewCycle create(ReviewCycle cycle) {

        cycle.setPerformanceCycle(performanceCycleService.getActiveCycle());
        return repository.save(cycle);
    }

    /* ================= ACTIVATE ================= */

    @Transactional
    public ReviewCycle activate(Long reviewCycleId) {

        ReviewCycle cycle = repository.findById(reviewCycleId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        ErrorCode.SYSTEM_ERROR, // can be REVIEW_CYCLE_NOT_FOUND later
                        "Review cycle not found"
                ));

        cycle.activate();

        // 🔥 orchestration (must be all-or-nothing)
        try {
            createReviewsForCycle(cycle);
            generateRatingsForCycle(cycle);
        } catch (Exception ex) {
            // ensures rollback + visibility
            throw new BusinessException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    ErrorCode.SYSTEM_ERROR,
                    "Failed to activate review cycle"
            );
        }

        return repository.save(cycle);
    }

    /* ================= CLOSE ================= */

    @Transactional
    public ReviewCycle close(Long reviewCycleId) {

        ReviewCycle cycle = repository.findById(reviewCycleId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        ErrorCode.SYSTEM_ERROR,
                        "Review cycle not found"
                ));

        cycle.close();
        return repository.save(cycle);
    }

    /* ================= READ ================= */

    public List<ReviewCycle> getAll() {
        return repository.findAll();
    }

    /* ================= INTERNAL ================= */

    private void createReviewsForCycle(ReviewCycle cycle) {

        List<User> employees = userRepository.findAllActiveEmployees();

        for (User employee : employees) {

            if (reviewRepository.existsByEmployeeIdAndReviewCycle(
                    employee.getId(), cycle)) {
                continue;
            }

            Review review = new Review();
            review.setEmployeeId(employee.getId());
            review.setManagerId(employee.getManagerId());
            review.setReviewCycle(cycle);

            reviewRepository.save(review);
        }
    }

    @Transactional
    public void generateRatingsForCycle(ReviewCycle cycle) {

        List<User> employees = userRepository.findAllActiveEmployees();

        for (User employee : employees) {

            boolean alreadyExists =
                    ratingRepository.existsByEmployeeIdAndPerformanceCycle(
                            employee.getId(),
                            cycle.getPerformanceCycle()
                    );

            if (alreadyExists) {
                continue;
            }

            double score = calculateInitialScore(employee.getId(), cycle);

            Rating rating = new Rating();
            rating.setEmployeeId(employee.getId());
            rating.setManagerId(employee.getManagerId());
            rating.setPerformanceCycle(cycle.getPerformanceCycle());
            rating.setScore(score);
            rating.setStatus(RatingStatus.DRAFT);
            rating.setManagerJustification("Auto-generated by system");

            ratingRepository.save(rating);
        }
    }

    private int calculateInitialScore(Long employeeId, ReviewCycle cycle) {

        List<Goal> goals =
                goalRepository.findByEmployeeIdAndPerformanceCycle_Id(
                        employeeId,
                        cycle.getPerformanceCycle().getId()
                );

        if (goals.isEmpty()) {
            return 2;
        }

        double totalProgress = 0;

        for (Goal goal : goals) {
            for (KeyResult kr : goal.getKeyResults()) {
                double progress =
                        (kr.getCurrentValue() / kr.getTargetValue()) * 100;
                totalProgress += Math.min(progress, 100);
            }
        }

        double avg = totalProgress / goals.size();

        if (avg >= 90) return 5;
        if (avg >= 75) return 4;
        if (avg >= 60) return 3;
        return 2;
    }
}
