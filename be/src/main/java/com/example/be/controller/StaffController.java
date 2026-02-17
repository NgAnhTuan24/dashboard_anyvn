package com.example.be.controller;

import com.example.be.dto.StaffRequest;
import com.example.be.dto.StaffResponse;
import com.example.be.entity.Staff;
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
    public StaffResponse createStaff(@RequestBody StaffRequest request) {
        return staffService.createStaff(request);
    }

    @PutMapping("/{id}/lock")
    public StaffResponse lockStaff(@PathVariable Long id) {
        return staffService.updateStatus(id, Staff.Status.INACTIVE);
    }

    @PutMapping("/{id}/unlock")
    public StaffResponse unlockStaff(@PathVariable Long id) {
        return staffService.updateStatus(id, Staff.Status.ACTIVE);
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }
}
