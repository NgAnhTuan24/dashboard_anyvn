package com.example.be.controller;

import com.example.be.dto.CreateStaffRequest;
import com.example.be.dto.StaffResponse;
import com.example.be.service.StaffService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public List<StaffResponse> getAllStaffs() {
        return staffService.getAllStaffs();
    }

    @PostMapping
    public StaffResponse createStaff(@RequestBody CreateStaffRequest request) {
        return staffService.createStaff(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }
}
