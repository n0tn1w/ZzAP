package com.example.hackathon.model.dto;

public class LeaderboardEntry {
    private String username;
    private Integer score;
    private String division;

    public LeaderboardEntry(String username, Integer score, String division) {
        this.username = username;
        this.score = score;
        this.division = division;
    }

    // Getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }
}
