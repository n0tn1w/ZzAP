package com.example.hackathon.model.dto;

public class UserLevelDTO {
    private String username;
    private Long levelId;
    private Long completionTime;
    private Boolean passed;
    private Integer score;

    // Constructor
    public UserLevelDTO(String username, Long levelId, Long completionTime, Boolean passed, Integer score) {
        this.username = username;
        this.levelId = levelId;
        this.completionTime = completionTime;
        this.passed = passed;
        this.score = score;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getLevelId() {
        return levelId;
    }

    public void setLevelId(Long levelId) {
        this.levelId = levelId;
    }

    public Long getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(Long completionTime) {
        this.completionTime = completionTime;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
