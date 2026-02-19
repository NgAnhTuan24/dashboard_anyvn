package com.example.be.mapper;

import com.example.be.dto.CustomerRequest;
import com.example.be.dto.CustomerResponse;
import com.example.be.entity.Customer;

public class CustomerMapper {

    public static Customer toEntity(CustomerRequest request) {
        Customer customer = new Customer();
        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setAddress(request.getAddress());
        return customer;
    }

    public static CustomerResponse toDTO(Customer customer) {

        CustomerResponse dto = new CustomerResponse();
        dto.setId(customer.getId());
        dto.setFullName(customer.getFullName());
        dto.setEmail(customer.getEmail());
        dto.setPhoneNumber(customer.getPhoneNumber());
        dto.setAddress(customer.getAddress());

        return dto;
    }
}
