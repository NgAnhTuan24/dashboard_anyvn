package com.example.be.security;

import com.example.be.entity.Staff;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Service
public class JwtService {
    private final String SECRET_KEY = "nguyenanhtuandzznguyenanhtuandzz";

    private long expiration = 1000 * 60 * 60 * 6;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(Staff staff ) {
        return Jwts.builder()
                .setSubject(staff.getEmail())
                .claim("role", staff.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
