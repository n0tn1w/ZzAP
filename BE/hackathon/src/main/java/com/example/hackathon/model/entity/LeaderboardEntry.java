package com.example.hackathon.model.entity;

import jakarta.persistence.*;

@Entity
public class LeaderboardEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private Integer score;

    public LeaderboardEntry() {
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LeaderboardEntry(Long id, User user, Integer score) {
        this.id = id;
        this.user = user;
        this.score = score;
    }
}
