package com.example.be.service;

import com.example.be.dto.CustomerRequest;
import com.example.be.dto.CustomerResponse;
import com.example.be.entity.Customer;
import com.example.be.mapper.CustomerMapper;
import com.example.be.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CustomerResponse createCustomer(CustomerRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        if (customerRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }

        Customer customer = CustomerMapper.toEntity(request);
        Customer saved = customerRepository.save(customer);

        return CustomerMapper.toDTO(saved);
    }

}
