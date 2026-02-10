package com.example.performance_management_system.common.handler;

import com.example.performance_management_system.common.error.ApiError;
import com.example.performance_management_system.common.error.ErrorCode;
import com.example.performance_management_system.common.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.List;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiError> handleBusiness(
            BusinessException ex,
            HttpServletRequest request
    ) {
        return build(
                ex.getStatus(),
                ex.getErrorCode().name(),
                ex.getMessage(),
                request
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        List<ApiError.FieldError> fields =
                ex.getBindingResult().getFieldErrors()
                        .stream()
                        .map(f -> new ApiError.FieldError(
                                f.getField(),
                                f.getDefaultMessage()
                        ))
                        .toList();

        return ResponseEntity.badRequest().body(
                ApiError.builder()
                        .status(400)
                        .errorCode(ErrorCode.VALIDATION_FAILED.name())
                        .message("Invalid request")
                        .path(request.getRequestURI())
                        .timestamp(Instant.now())
                        .fieldErrors(fields)
                        .build()
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleConstraint(
            DataIntegrityViolationException ex,
            HttpServletRequest request
    ) {
        return build(
                HttpStatus.CONFLICT,
                ErrorCode.DATA_INTEGRITY_VIOLATION.name(),
                "Operation violates system constraints",
                request
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleFallback(
            Exception ex,
            HttpServletRequest request
    ) {
        log.error("Unhandled exception", ex);

        return build(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ErrorCode.SYSTEM_ERROR.name(),
                "Unexpected error occurred",
                request
        );
    }

    private ResponseEntity<ApiError> build(
            HttpStatus status,
            String code,
            String message,
            HttpServletRequest request
    ) {
        return ResponseEntity.status(status).body(
                ApiError.builder()
                        .status(status.value())
                        .errorCode(code)
                        .message(message)
                        .path(request.getRequestURI())
                        .timestamp(Instant.now())
                        .build()
        );
    }
}

