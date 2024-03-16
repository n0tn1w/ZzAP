package com.example.hackathon.model.dto;

public class UserResponseDTO {

    private Long id;
    private String username;
    private String password;


    public UserResponseDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
