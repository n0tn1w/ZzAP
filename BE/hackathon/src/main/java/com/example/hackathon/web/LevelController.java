package com.example.hackathon.web;

import com.example.hackathon.model.dto.LevelDTO;
import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.service.LevelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class LevelController {

    private final LevelRepository levelRepository;

    private final LevelService levelService;

    public LevelController(LevelRepository levelRepository, LevelService levelService) {
        this.levelRepository = levelRepository;
        this.levelService = levelService;
    }

    @GetMapping("/levels")
    public List<List<Level>> getLevelsByType() {
        Map<LevelType, List<Level>> groupedLevels = levelService.getLevelsGroupedByType();

        List<List<Level>> levelsByType = new ArrayList<>();
        levelsByType.add(groupedLevels.getOrDefault(LevelType.TYPE_A, new ArrayList<>()));
        levelsByType.add(groupedLevels.getOrDefault(LevelType.TYPE_B, new ArrayList<>()));
        levelsByType.add(groupedLevels.getOrDefault(LevelType.DEFAULT, new ArrayList<>()));

        return levelsByType;
    }

    @GetMapping("/levels/{id}")
    public ResponseEntity<LevelDTO> getLevelById(@PathVariable(value = "id") Long id) {
        LevelDTO levelDto = levelService.getLevelById(id);
        return ResponseEntity.ok().body(levelDto);
    }
}
