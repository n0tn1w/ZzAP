package com.example.hackathon.web;


import com.example.hackathon.model.dto.AuthenticationResponse;
import com.example.hackathon.model.dto.UserLoginDTO;
import com.example.hackathon.model.dto.UserRegistrationDTO;
import com.example.hackathon.model.dto.UserResponseDTO;
import com.example.hackathon.security.JwtUtil;
import com.example.hackathon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

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
