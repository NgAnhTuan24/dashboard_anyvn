package com.example.be.dto;

import com.example.be.entity.Staff;

public class CreateStaffRequest {
    private String fullName;
    private String email;
    private String password;
    // Xem xét chỉ có role là admin mới cho phép thiết lập role
    //private Staff.Role role;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public Staff.Role getRole() {
//        return role;
//    }
//
//    public void setRole(Staff.Role role) {
//        this.role = role;
//    }
}
