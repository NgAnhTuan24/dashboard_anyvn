package com.example.be.repository;

import com.example.be.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
}
