package com.example.hackathon.service;


import com.example.hackathon.model.dto.UserDTO;
import com.example.hackathon.model.dto.UserRegistrationDTO;
import com.example.hackathon.model.dto.UserResponseDTO;

public interface UserService {

    UserResponseDTO registerUser(UserRegistrationDTO registrationDTO);
    UserResponseDTO authenticateUser(String username, String password);
    UserDTO getUserDetailsByUsername(String username);

}
