package com.example.hackathon.web;

import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.service.FileStorageService;
import com.example.hackathon.service.LevelService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class LevelController {

    private final FileStorageService fileStorageService;
    private final LevelRepository levelRepository;

    private final LevelService levelService;

    public LevelController(FileStorageService fileStorageService, LevelRepository levelRepository, LevelService levelService) {
        this.fileStorageService = fileStorageService;
        this.levelRepository = levelRepository;
        this.levelService = levelService;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        Level level = new Level();
        level.setInoFilePath("D:\\stuff2\\data" + fileName);
        levelRepository.save(level);

        return "File uploaded successfully: " + fileName;
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
}
