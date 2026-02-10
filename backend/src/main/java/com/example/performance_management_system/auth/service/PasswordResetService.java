package com.example.performance_management_system.auth.service;

import com.example.performance_management_system.auth.model.PasswordResetToken;
import com.example.performance_management_system.auth.repository.PasswordResetTokenRepository;
import com.example.performance_management_system.common.error.ErrorCode;
import com.example.performance_management_system.common.exception.BusinessException;
import com.example.performance_management_system.user.model.User;
import com.example.performance_management_system.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(
            PasswordResetTokenRepository tokenRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String createResetToken(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        ErrorCode.USER_NOT_FOUND,
                        "User not found"
                ));

        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUserId(user.getId());
        token.setExpiresAt(LocalDateTime.now().plusMinutes(15));
        token.setUsed(false);

        tokenRepository.save(token);

        // Token returned directly (token-only mode)
        return token.getToken();
    }

    public void resetPassword(String tokenValue, String newPassword) {

        PasswordResetToken token = tokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.BAD_REQUEST,
                        ErrorCode.VALIDATION_FAILED,
                        "Invalid reset token"
                ));

        if (token.getUsed()) {
            throw new BusinessException(
                    HttpStatus.CONFLICT,
                    ErrorCode.VALIDATION_FAILED,
                    "Reset token already used"
            );
        }

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BusinessException(
                    HttpStatus.CONFLICT,
                    ErrorCode.VALIDATION_FAILED,
                    "Reset token expired"
            );
        }

        User user = userRepository.findById(token.getUserId())
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        ErrorCode.USER_NOT_FOUND,
                        "User not found"
                ));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        token.setUsed(true);
        tokenRepository.save(token);
    }
}
