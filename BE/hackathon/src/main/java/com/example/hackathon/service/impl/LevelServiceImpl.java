package com.example.hackathon.service.impl;

import com.example.hackathon.model.dto.Edge;
import com.example.hackathon.model.dto.LevelDTO;
import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.service.LevelService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class LevelServiceImpl implements LevelService {

    private final LevelRepository levelRepository;

    public LevelServiceImpl(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @Override
    public Map<LevelType, List<Level>> getLevelsGroupedByType() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream().collect(Collectors.groupingBy(Level::getLevelType));
    }

    @Override
    public LevelDTO getLevelById(Long id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Level not found for this id :: " + id));

        List<Edge> edges = level.getEdges().stream()
                .map(s -> s.split("-"))
                .map(arr -> new Edge(Integer.parseInt(arr[0]), Integer.parseInt(arr[1])))
                .collect(Collectors.toList());

        List<Integer> nodes = IntStream.rangeClosed(1, level.getNodesCount()).boxed().collect(Collectors.toList());

        LevelDTO levelDto = new LevelDTO();
        levelDto.setId(level.getId());
        levelDto.setLevelType(level.getLevelType());
        levelDto.setNodesCount(level.getNodesCount());
        levelDto.setEdgesCount(level.getEdgesCount());
        levelDto.setEdges(edges);
        levelDto.setNodes(nodes);

        return levelDto;
    }
}
