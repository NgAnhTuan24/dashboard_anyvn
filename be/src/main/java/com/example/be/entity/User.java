package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.STAFF;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.INACTIVE;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role {
        ADMIN,
        STAFF
    }

    public enum UserStatus {
        ACTIVE,
        INACTIVE
    }
}