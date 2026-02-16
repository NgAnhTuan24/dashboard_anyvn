package com.example.be.mapper;

import com.example.be.dto.CreateStaffRequest;
import com.example.be.dto.StaffResponse;
import com.example.be.entity.Staff;

public class StaffMapper {

    public static Staff toEntity(CreateStaffRequest request) {
        Staff staff = new Staff();
        staff.setFullName(request.getFullName());
        staff.setEmail(request.getEmail());
        staff.setPassword(request.getPassword());
        staff.setRole(Staff.Role.STAFF);
        staff.setStatus(Staff.Status.ACTIVE);
        return staff;
    }

    public static StaffResponse toResponse(Staff staff) {
        if (staff == null) return null;

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
