package com.WonderVentures.service;


import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.Jwt.AuthResponse;
import com.WonderVentures.Jwt.loginAndRegisterRequest.LoginRequest;
import com.WonderVentures.Jwt.loginAndRegisterRequest.RegisterRequest;
import com.WonderVentures.Jwt.jwtService.JwtService;
import com.WonderVentures.entity.Person;
import com.WonderVentures.entity.Role;
import com.WonderVentures.exception.AuthResponseException;
import com.WonderVentures.repository.PersonRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jdk.jfr.Registered;
import lombok.RequiredArgsConstructor;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PersonRepository personRepository;

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) throws Exception {
        UserDetails user=personRepository.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("Email no registrado"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Person person = personRepository.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("Email no registrado"));
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .userName(person.getName())
                .userLastName(person.getSurname())
                .userRol(person.getRole())
                .userEmail(person.getUsername())
                .favExperiences(person.getFavExperiences())
                .build();

    }




    public AuthResponse register(RegisterRequest request) {
        Person user = Person.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .surname(request.getSurname())
                .role(Role.USER)
                .build();

        personRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();

    }

    public AuthResponse registerMaster(RegisterRequest request) {
        Person user = Person.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .surname(request.getSurname())
                .role(Role.ADMIN)
                .build();

        personRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();

    }

}
