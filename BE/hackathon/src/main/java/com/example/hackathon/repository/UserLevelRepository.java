package com.example.hackathon.repository;

import com.example.hackathon.model.entity.UserLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {
    List<UserLevel> findByLevelIdOrderByCompletionTimeAsc(Long levelId);

    List<UserLevel> findByLevelId(Long levelId);

    @Query("SELECT SUM(ul.score) FROM UserLevel ul WHERE ul.user.id = :userId")
    Integer calculateTotalScoreForUser(@Param("userId") Long userId);

}
