package com.example.performance_management_system.keyresult.service;

import com.example.performance_management_system.common.exception.BusinessException;
import com.example.performance_management_system.config.security.SecurityUtil;
import com.example.performance_management_system.goal.model.Goal;
import com.example.performance_management_system.goal.service.GoalService;
import com.example.performance_management_system.keyresult.model.KeyResult;
import com.example.performance_management_system.keyresult.repository.KeyResultRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class KeyResultService {

    private final KeyResultRepository repository;

    private final GoalService goalService;

    public KeyResultService(
            KeyResultRepository repository,
            GoalService goalService
    ) {
        this.repository = repository;
        this.goalService = goalService;
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    @Transactional
    public KeyResult updateProgress(Long keyResultId, Double value) {

        KeyResult kr = repository.findById(keyResultId)
                .orElseThrow(() -> new BusinessException("Key Result not found"));

        Goal goal = kr.getGoal();

        //  ownership check
        if (!goal.getEmployeeId().equals(SecurityUtil.userId())) {
            throw new BusinessException("You cannot update someone else's key result");
        }

        //  business rule
        if (value > kr.getTargetValue()) {
            throw new BusinessException("Progress cannot exceed target value");
        }

        kr.updateProgress(value);
        goalService.autoCompleteGoalIfEligible(goal);
        return repository.save(kr);
    }
}
