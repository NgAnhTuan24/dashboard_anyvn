package com.example.be.repository;

import com.example.be.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    boolean existsByEmail(String email);
    Optional<Staff> findByEmail(String email);
    List<Staff> findByRole(Staff.Role role);
}
