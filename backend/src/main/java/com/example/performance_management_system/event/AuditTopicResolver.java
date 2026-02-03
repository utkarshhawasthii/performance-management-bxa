package com.example.performance_management_system.event;

public final class AuditTopicResolver {

    private AuditTopicResolver() {}

    public static String resolve(DomainType domain) {
        return switch (domain) {
            case AUTH -> "pms.auth.events";
            case USER -> "pms.user.events";
            case DEPARTMENT -> "pms.department.events";
            case GOAL -> "pms.goal.events";
            case REVIEW -> "pms.review.events";
            case RATING -> "pms.rating.events";
            case CYCLE -> "pms.cycle.events";
        };
    }
}
