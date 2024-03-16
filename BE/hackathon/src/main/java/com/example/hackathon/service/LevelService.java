package com.example.hackathon.service;

import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.enums.LevelType;

import java.util.List;
import java.util.Map;

public interface LevelService {
    Map<LevelType, List<Level>> getLevelsGroupedByType();

}
