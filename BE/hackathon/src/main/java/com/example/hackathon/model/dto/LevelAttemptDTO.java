package com.example.hackathon.model.dto;

public class LevelAttemptDTO {
    private Long time; // Time taken to complete the level in milliseconds
    private Boolean passed; // Whether the level was passed



    public LevelAttemptDTO() {
    }

    public LevelAttemptDTO(Long time, Boolean passed) {
        this.time = time;
        this.passed = passed;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public Boolean getPassed() {
        return passed;
    }


    public void setPassed(Boolean passed) {
        this.passed = passed;
    }
}
