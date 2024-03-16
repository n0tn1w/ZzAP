package com.example.hackathon.model.entity;

import com.example.hackathon.model.enums.LevelType;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer number;
    private Integer points;
    @Enumerated(EnumType.STRING)
    private LevelType levelType;

    private Integer nodesCount;
    private Integer edgesCount;

    @ElementCollection
    private List<String> edges;

    public Level(Long id, Integer number, Integer points, LevelType levelType) {
        this.id = id;
        this.number = number;
        this.points = points;
        this.levelType = levelType;
    }

    public Level() {

    }

    public Level(LevelType levelType, Integer number, Integer points, Integer nodesCount, Integer edgesCount, List<String> edges) {
        this.number = number;
        this.points = points;
        this.levelType = levelType;
        this.nodesCount = nodesCount;
        this.edgesCount = edgesCount;
        this.edges = edges;
    }

    public Level(LevelType levelType, Integer number, Integer points, List<String> edges) {
        this.number = number;
        this.points = points;
        this.levelType = levelType;
        this.edges = edges;
    }

    //
//    public LevelType getLevelType() {
//        return levelType;
//    }
//
//    public void setLevelType(LevelType levelType) {
//        this.levelType = levelType;
//    }

    public Level(Integer number, Integer points) {
        this.number = number;
        this.points = points;
    }

    public Level(Long id, Integer number, Integer points) {
        this.id = id;
        this.number = number;
        this.points = points;
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

    public Integer getNodesCount() {
        return nodesCount;
    }

    public void setNodesCount(Integer nodesCount) {
        this.nodesCount = nodesCount;
    }

    public Integer getEdgesCount() {
        return edgesCount;
    }

    public void setEdgesCount(Integer edgesCount) {
        this.edgesCount = edgesCount;
    }

    public List<String> getEdges() {
        return edges;
    }

    public void setEdges(List<String> edges) {
        this.edges = edges;
    }

    public LevelType getLevelType() {
        return levelType;
    }

    public void setLevelType(LevelType levelType) {
        this.levelType = levelType;
    }

// Constructors, Getters and Setters
}
