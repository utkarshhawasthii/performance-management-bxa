package com.example.performance_management_system.config.security.handler;

import com.example.performance_management_system.common.error.ApiError;
import com.example.performance_management_system.common.error.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;

@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException ex
    ) throws IOException {

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");

        ApiError error = ApiError.builder()
                .status(403)
                .errorCode(ErrorCode.ACCESS_DENIED.name())
                .message("You are not allowed to perform this action")
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .build();

        response.getWriter().write(
                new ObjectMapper().writeValueAsString(error)
        );
    }
}

