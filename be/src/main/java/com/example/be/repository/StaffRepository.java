package com.example.be.repository;

import com.example.be.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    boolean existsByEmail(String email);

    List<Staff> findByRole(Staff.Role role);
}
