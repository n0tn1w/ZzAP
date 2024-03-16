package com.example.hackathon.web;


import com.example.hackathon.model.dto.*;
import com.example.hackathon.security.JwtUtil;
import com.example.hackathon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping(value ="/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> getCurrentUser(Principal principal) {
        UserDTO userDto = userService.getUserDetailsByUsername(principal.getName());
        return ResponseEntity.ok(userDto);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDTO loginDTO) {
        UserResponseDTO user = userService.authenticateUser
                (loginDTO.getUsername(), loginDTO.getPassword());
        final String jwt = jwtUtil.generateToken(loginDTO.getUsername());

        if (user != null) {
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        UserResponseDTO registeredUser = userService.registerUser(registrationDTO);
        return ResponseEntity.ok(registeredUser);
    }

}
