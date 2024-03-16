package com.example.hackathon.repository;

import com.example.hackathon.model.entity.UserLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {
    List<UserLevel> findByLevelIdOrderByCompletionTimeAsc(Long levelId);

    List<UserLevel> findByLevelId(Long levelId);
}
