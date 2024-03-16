package com.example.hackathon.model.dto;

import com.example.hackathon.model.enums.LevelType;

import java.util.List;

public class LevelDTO {
    private Long id;
    private LevelType levelType;
    private Integer nodesCount;
    private Integer edgesCount;
    private List<Edge> edges;
    private List<Integer> nodes; // List of node IDs

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LevelType getLevelType() {
        return levelType;
    }

    public void setLevelType(LevelType levelType) {
        this.levelType = levelType;
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

    public List<Edge> getEdges() {
        return edges;
    }

    public void setEdges(List<Edge> edges) {
        this.edges = edges;
    }

    public List<Integer> getNodes() {
        return nodes;
    }

    public void setNodes(List<Integer> nodes) {
        this.nodes = nodes;
    }
}
