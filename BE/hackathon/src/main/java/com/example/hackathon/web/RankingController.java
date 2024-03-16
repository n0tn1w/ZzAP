package com.example.hackathon.web;

import com.example.hackathon.model.dto.RankingEntryDTO;
import com.example.hackathon.service.impl.RankingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rankings")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/{levelId}")
    public ResponseEntity<List<RankingEntryDTO>> getRankingsForLevel(@PathVariable Long levelId) {
        List<RankingEntryDTO> rankings = rankingService.getBestRankingsForLevel(levelId);
        return ResponseEntity.ok(rankings);
    }
}
