package com.example.be.security;

import com.example.be.entity.Staff;
import com.example.be.repository.StaffRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final StaffRepository staffRepository;

    public JwtAuthFilter(JwtService jwtService, StaffRepository staffRepository) {
        this.jwtService = jwtService;
        this.staffRepository = staffRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws IOException, ServletException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            String email = jwtService.extractEmail(token);

            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                Staff staff = staffRepository.findByEmail(email).orElse(null);

                if (staff == null || staff.getStatus() != Staff.Status.ACTIVE) {
                    chain.doFilter(request, response);
                    return;
                }

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                staff.getEmail(),
                                null,
                                List.of(new SimpleGrantedAuthority(
                                        "ROLE_" + staff.getRole().name()
                                ))
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        } catch (Exception e) {
            chain.doFilter(request, response);
            return;
        }

        chain.doFilter(request, response);
    }
}
