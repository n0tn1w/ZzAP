package com.example.hackathon.service.impl;

import com.example.hackathon.model.dto.Edge;
import com.example.hackathon.model.dto.LevelAttemptDTO;
import com.example.hackathon.model.dto.LevelDTO;
import com.example.hackathon.model.dto.UserLevelDTO;
import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.model.entity.UserLevel;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.repository.UserLevelRepository;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.service.LevelService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class LevelServiceImpl implements LevelService {

    private final LevelRepository levelRepository;
    private final UserLevelRepository userLevelRepository;

    private final UserRepository userRepository;

    public LevelServiceImpl(LevelRepository levelRepository, UserLevelRepository userLevelRepository, UserRepository userRepository) {
        this.levelRepository = levelRepository;
        this.userLevelRepository = userLevelRepository;
        this.userRepository = userRepository;
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

    @Override
    public UserLevelDTO recordLevelAttempt(Long levelId, LevelAttemptDTO attempt, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new EntityNotFoundException("Level not found for this id :: " + levelId));

        UserLevel userLevel = new UserLevel();
        userLevel.setUser(user);
        userLevel.setLevel(level);
        userLevel.setCompletionTime(attempt.getTime());
        userLevel.setPassed(attempt.getPassed());
        userLevel.setScore(calculateScore(level.getPoints(), userLevel.getCompletionTime())); // Implement this method based on your scoring logic
        userLevelRepository.save(userLevel);

        // Convert the saved entity to DTO if necessary and return
        return convertToDTO(userLevel); // Implement the conversion method according to your needs
    }

    private int calculateScore(int points, long completionTime) {
        if (points == 10) {
            if (completionTime >= 55000 && completionTime <= 65000) return 10;
            else if (completionTime < 55000) return 15;
            else return 5;
        } else if (points == 5) {
            if (completionTime >= 30000 && completionTime <= 35000) return 5;
            else if (completionTime < 30000) return 8;
            else return 3;
        }
        return 0; // Default case
    }

    public UserLevelDTO convertToDTO(UserLevel userLevel) {
        if (userLevel == null) {
            return null;
        }

        return new UserLevelDTO(
                userLevel.getUser().getUsername(),
                userLevel.getLevel().getId(),
                userLevel.getCompletionTime(),
                userLevel.getPassed(),
                userLevel.getScore()
        );
    }


}
