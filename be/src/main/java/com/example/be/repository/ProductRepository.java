package com.example.be.repository;

import com.example.be.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByProductID(String productID);

    Page<Product> findByProductIDContainingIgnoreCaseOrProductNameContainingIgnoreCase(
            String productID,
            String productName,
            Pageable pageable
    );
}