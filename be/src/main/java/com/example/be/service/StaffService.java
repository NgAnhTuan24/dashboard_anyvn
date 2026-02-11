package com.example.be.service;

import com.example.be.dto.CreateStaffRequest;
import com.example.be.dto.StaffResponse;
import com.example.be.entity.Staff;
import com.example.be.repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<StaffResponse> getAllStaff() {

        List<Staff> staffs = staffRepository.findByRole(Staff.Role.STAFF);

        return staffs.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public StaffResponse createStaff(CreateStaffRequest request) {

        if (staffRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Staff staff = new Staff();
        staff.setFullName(request.getFullName());
        staff.setEmail(request.getEmail());
        staff.setPassword(request.getPassword());
        staff.setRole(Staff.Role.STAFF);
        staff.setStatus(Staff.Status.ACTIVE);

        Staff saved = staffRepository.save(staff);

        return mapToResponse(saved);
    }

    private StaffResponse mapToResponse(Staff staff) {
        StaffResponse response = new StaffResponse();
        response.setId(staff.getId());
        response.setFullName(staff.getFullName());
        response.setEmail(staff.getEmail());
        response.setRole(staff.getRole());
        response.setStatus(staff.getStatus());
        response.setCreatedAt(staff.getCreatedAt());
        return response;
    }
}
