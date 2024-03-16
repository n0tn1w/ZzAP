package com.example.hackathon.service.impl;

import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.service.LevelService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LevelServiceImpl implements LevelService {

    private final LevelRepository levelRepository;

    public LevelServiceImpl(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public Map<LevelType, List<Level>> getLevelsGroupedByType() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream().collect(Collectors.groupingBy(Level::getLevelType));
    }
}
