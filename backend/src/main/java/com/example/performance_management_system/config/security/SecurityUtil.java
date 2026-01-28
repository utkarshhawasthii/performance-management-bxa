package com.example.performance_management_system.config.security;

import com.example.performance_management_system.config.security.model.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtil {

    private SecurityUtil() {}

    public static UserPrincipal currentUser() {
        return (UserPrincipal)
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();
    }

    public static Long userId() {
        return currentUser().getUserId();
    }

    public static String role() {
        return currentUser().getRole();
    }
}

