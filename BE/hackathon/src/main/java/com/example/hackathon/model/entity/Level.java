package com.example.hackathon.model.entity;

import com.example.hackathon.model.enums.LevelType;
import jakarta.persistence.*;

@Entity
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer number;
    private Integer points;
    private String inoFilePath;
    @Enumerated(EnumType.STRING)
    private LevelType levelType;

    public Level(Long id, Integer number, Integer points, String inoFile, LevelType levelType) {
        this.id = id;
        this.number = number;
        this.points = points;
        this.inoFilePath = inoFile;
        this.levelType = levelType;
    }

    public Level() {

    }
//
//    public LevelType getLevelType() {
//        return levelType;
//    }
//
//    public void setLevelType(LevelType levelType) {
//        this.levelType = levelType;
//    }

    public Level(Integer number, Integer points, String inoFile) {
        this.number = number;
        this.points = points;
        this.inoFilePath = inoFile;
    }

    public Level(Long id, Integer number, Integer points, String inoFile) {
        this.id = id;
        this.number = number;
        this.points = points;
        this.inoFilePath = inoFile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getInoFilePath() {
        return inoFilePath;
    }

    public void setInoFilePath(String inoFile) {
        this.inoFilePath = inoFile;
    }

    public LevelType getLevelType() {
        return levelType;
    }

    public void setLevelType(LevelType levelType) {
        this.levelType = levelType;
    }

// Constructors, Getters and Setters
}
