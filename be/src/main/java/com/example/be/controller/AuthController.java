package com.example.be.controller;

import com.example.be.dto.LoginRequest;
import com.example.be.dto.LoginResponse;
import com.example.be.service.StaffService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final StaffService staffService;

    public AuthController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return staffService.login(request);
    }
}
