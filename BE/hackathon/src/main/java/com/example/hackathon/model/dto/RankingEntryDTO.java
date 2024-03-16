package com.example.hackathon.model.dto;

public class RankingEntryDTO {
    private String username;
    private Integer score;
    private Integer stars;
    private Long time;

    public RankingEntryDTO(String username, Integer score, Integer stars, Long time) {
        this.username = username;
        this.score = score;
        this.stars = stars;
        this.time = time;
    }

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

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }
}
