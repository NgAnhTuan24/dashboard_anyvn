package com.example.be.service;

import com.example.be.dto.StaffRequest;
import com.example.be.dto.LoginRequest;
import com.example.be.dto.LoginResponse;
import com.example.be.dto.StaffResponse;
import com.example.be.entity.Staff;
import com.example.be.mapper.StaffMapper;
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

    public List<StaffResponse> getAllStaffs() {

        List<Staff> staffs = staffRepository.findByRole(Staff.Role.STAFF);

        return staffs.stream()
                .map(StaffMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StaffResponse createStaff(StaffRequest request) {

        if (staffRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        Staff staff = StaffMapper.toEntity(request);

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

        if (!staff.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        if (staff.getStatus() != Staff.Status.ACTIVE) {
            throw new RuntimeException("Tài khoản bị khóa");
        }

        return new LoginResponse(
                staff.getId(),
                staff.getFullName(),
                staff.getEmail(),
                staff.getRole().name()
        );
    }
}
