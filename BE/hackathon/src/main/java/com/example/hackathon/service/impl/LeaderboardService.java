package com.example.hackathon.service.impl;

import com.example.hackathon.model.dto.LeaderboardEntry;
import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.model.entity.UserLevel;
import com.example.hackathon.repository.UserLevelRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final UserLevelRepository userLevelRepository;

    public LeaderboardService(UserLevelRepository userLevelRepository) {
        this.userLevelRepository = userLevelRepository;
    }

    public List<LeaderboardEntry> getLeaderboard() {
        List<UserLevel> entries = userLevelRepository.findAll();

        // Group by user, then by level, and find max score per level
        Map<User, Map<Level, Optional<UserLevel>>> maxScoresPerLevel = entries.stream()
                .collect(Collectors.groupingBy(UserLevel::getUser,
                        Collectors.groupingBy(UserLevel::getLevel,
                                Collectors.maxBy(Comparator.comparingInt(UserLevel::getScore)))));

        // Sum the max scores for each user across levels
        Map<User, Integer> totalScoresByUser = maxScoresPerLevel.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey,
                        e -> e.getValue().values().stream()
                                .filter(Optional::isPresent)
                                .mapToInt(ul -> ul.get().getScore())
                                .sum()));

        return totalScoresByUser.entrySet().stream()
                .map(e -> new LeaderboardEntry(e.getKey().getUsername(), e.getValue(), determineDivision(e.getValue())))
                .sorted(Comparator.comparingInt(LeaderboardEntry::getScore).reversed())
                .collect(Collectors.toList());
    }

    private String determineDivision(Integer score) {
        if (score > 100) return "Diamond";
        else if (score > 50) return "Gold";
        else if (score > 10) return "Silver";
        else return "Bronze";
    }
}