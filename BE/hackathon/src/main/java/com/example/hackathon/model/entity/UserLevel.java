package com.example.hackathon.model.entity;

import jakarta.persistence.*;

@Entity
public class UserLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Level level;

    private Boolean passed;

    private Long completionTime;

    private Integer score;

    public UserLevel() {
    }

    public UserLevel(User user, Level level, Boolean passed, Long completionTime, Integer score) {
        this.user = user;
        this.level = level;
        this.passed = passed;
        this.completionTime = completionTime;
        this.score = score;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public Long getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(Long completionTime) {
        this.completionTime = completionTime;
    }

    // Constructors, Getters and Setters
}

