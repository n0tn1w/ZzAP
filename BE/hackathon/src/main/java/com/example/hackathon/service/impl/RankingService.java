package com.example.hackathon.service.impl;

import com.example.hackathon.model.dto.RankingEntryDTO;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.model.entity.UserLevel;
import com.example.hackathon.repository.UserLevelRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
@Service
public class RankingService {

    private final UserLevelRepository userLevelRepository;

    public RankingService(UserLevelRepository userLevelRepository) {
        this.userLevelRepository = userLevelRepository;
    }

    public List<RankingEntryDTO> getBestRankingsForLevel(Long levelId) {
        List<UserLevel> attempts = userLevelRepository.findByLevelId(levelId);

        // Group by user and select the best attempt
        Map<User, UserLevel> bestAttemptsByUser = attempts.stream()
                .collect(Collectors.toMap(
                        UserLevel::getUser,
                        Function.identity(),
                        (attempt1, attempt2) -> attempt1.getScore() > attempt2.getScore() ? attempt1 : attempt2 // Assumes higher score is better
                ));

        // Convert to DTOs and sort by time (asc)
        return bestAttemptsByUser.values().stream()
                .map(ul -> new RankingEntryDTO(
                        ul.getUser().getUsername(),
                        ul.getScore(),
                        calculateStars(ul.getCompletionTime()),
                        ul.getCompletionTime()))
                .sorted(Comparator.comparingLong(RankingEntryDTO::getScore))
                .collect(Collectors.toList());
    }


    private Integer calculateStars(Long time) {
        if (time <= 20000) return 3; // 1-20 seconds
        else if (time <= 50000) return 2; // 21-50 seconds
        else return 1; // above 50 seconds
    }
}
