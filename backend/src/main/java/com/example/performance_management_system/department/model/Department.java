package com.example.performance_management_system.department.model;

import com.example.performance_management_system.common.enums.DepartmentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(
        name = "department",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_department_type",
                        columnNames = {"type"}
                )
        }
)
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DepartmentType type;

    @Column(nullable = false)
    private String displayName;

    @Column(name = "head_id")
    private Long headId;

    private Boolean active = true;

    // getters & setters
}
