package com.example.performance_management_system.user.service;

import com.example.performance_management_system.common.enums.Role;
import com.example.performance_management_system.common.exception.BusinessException;
import com.example.performance_management_system.role.model.RoleEntity;
import com.example.performance_management_system.role.repository.RoleRepository;
import com.example.performance_management_system.user.model.User;
import com.example.performance_management_system.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository repository, RoleRepository roleRepository,PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new BusinessException("User not found"));
    }

    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new BusinessException("User not found"));
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Page<User> getAllUsersPaginated(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }



    public User createUser(String username, String password, Role role, Long managerId) {
        if (repository.findByUsername(username).isPresent()) {
            throw new BusinessException("Username already exists");
        }

        RoleEntity roleEntity  = roleRepository.findById(role)
                .orElseThrow(() -> new BusinessException("Role not found"));

        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // hashed later
        user.setRole(roleEntity);
        user.setManagerId(managerId);
        user.setActive(true);

        return repository.save(user);
    }

    public User registerUser(String username,
                             String rawPassword,
                             Role role,
                             Long managerId){
        if(repository.findByUsername(username).isPresent()){
            throw new BusinessException("Username already Exists");
        }

        RoleEntity roleEntity = roleRepository.findById(role)
                .orElseThrow(() -> new BusinessException("Role not found"));
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(roleEntity);
        user.setManagerId(managerId);
        user.setActive(true);

        return repository.save(user);
    }
}

