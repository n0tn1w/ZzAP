package com.example.hackathon.service.impl;

import com.example.hackathon.model.dto.UserDTO;
import com.example.hackathon.model.dto.UserRegistrationDTO;
import com.example.hackathon.model.dto.UserResponseDTO;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.repository.UserLevelRepository;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserLevelRepository userLevelRepository;

    @Autowired
    private final ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public UserServiceImpl(UserRepository userRepository, UserLevelRepository userLevelRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userLevelRepository = userLevelRepository;
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

    @Override
    public UserDTO getUserDetailsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        Integer totalScore = calculateTotalScoreForUser(user.getId());
        String division = determineDivision(totalScore);


        return new UserDTO(user.getId(), user.getUsername(), division, totalScore);
    }

    public Integer calculateTotalScoreForUser(Long userId) {
        Integer totalScore = userLevelRepository.calculateTotalScoreForUser(userId);
        return totalScore != null ? totalScore : 0;
    }


    private String determineDivision(Integer score) {
        if (score > 20) return "gold";
        else if (score > 10) return "silver";
        else return "bronze";
    }
}
