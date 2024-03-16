package com.example.hackathon.service.impl;

import com.example.hackathon.model.dto.UserRegistrationDTO;
import com.example.hackathon.model.dto.UserResponseDTO;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    private final ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserResponseDTO registerUser(UserRegistrationDTO registrationDTO) {
        User user = modelMapper.map(registrationDTO, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponseDTO.class);
    }
    @Override
    public UserResponseDTO authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return modelMapper.map(user, UserResponseDTO.class);
        }
        return null;
    }
}
