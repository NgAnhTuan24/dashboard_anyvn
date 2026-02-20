package com.example.be.service;

import com.example.be.dto.StaffRequest;
import com.example.be.dto.LoginRequest;
import com.example.be.dto.LoginResponse;
import com.example.be.dto.StaffResponse;
import com.example.be.entity.Staff;
import com.example.be.mapper.StaffMapper;
import com.example.be.repository.StaffRepository;
import com.example.be.security.JwtService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public StaffService(StaffRepository staffRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Page<StaffResponse> getAllStaff(String keyword, Pageable pageable) {

        Page<Staff> page;

        if (keyword != null && !keyword.trim().isEmpty()) {
            page = staffRepository
                    .findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                            keyword, keyword, pageable);
        } else {
            page = staffRepository.findByRole(Staff.Role.STAFF, pageable);
        }

        return page.map(StaffMapper::toDTO);
    }

    public StaffResponse createStaff(StaffRequest request) {

        if (staffRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        Staff staff = StaffMapper.toEntity(request);

        staff.setPassword(passwordEncoder.encode(request.getPassword()));

        Staff saved = staffRepository.save(staff);

        return StaffMapper.toDTO(saved);
    }

    public StaffResponse updateStatus(Long id, Staff.Status status) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));

        staff.setStatus(status);

        return StaffMapper.toDTO(staffRepository.save(staff));
    }

    public void deleteStaff(Long id) {
        Staff staff = staffRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));

        staffRepository.delete(staff);
    }

    public LoginResponse login(LoginRequest request) {

        Staff staff = staffRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        if (!passwordEncoder.matches(request.getPassword(), staff.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        if (staff.getStatus() != Staff.Status.ACTIVE) {
            throw new RuntimeException("Tài khoản bị khóa");
        }

        String token = jwtService.generateToken(staff);

        return new LoginResponse(
                staff.getId(),
                staff.getFullName(),
                staff.getEmail(),
                staff.getRole().name(),
                token
        );
    }
}
