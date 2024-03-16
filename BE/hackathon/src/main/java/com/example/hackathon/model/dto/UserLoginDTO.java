package com.example.hackathon.model.dto;

public class UserLoginDTO {
    private String username;
    private String password;

    // Constructor
    public UserLoginDTO() {
    }

    // Getters and setters
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
