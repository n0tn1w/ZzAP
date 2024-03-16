package com.example.hackathon.seed;

import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.model.entity.UserLevel;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.repository.UserLevelRepository;
import com.example.hackathon.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository,
                                   LevelRepository levelRepository,
                                   UserLevelRepository userLevelRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Users
            User user1 = new User("vilik", passwordEncoder.encode("password"));
            User user2 = new User("agurov", passwordEncoder.encode("password"));
            User user3 = new User("donchoi", passwordEncoder.encode("password"));
            User user4 = new User("danim", passwordEncoder.encode("password"));
            User user5 = new User("alex", passwordEncoder.encode("password"));
            userRepository.saveAll(Arrays.asList(user1, user2, user3, user4, user5));

            // Seed Levels
            Level level1 = new Level(LevelType.TYPE_A, 5, 5, 5, 4, Arrays.asList("1-2", "2-3", "3-4", "4-5"));
            Level level2 = new Level(LevelType.TYPE_B, 5, 10, 3, 2, Arrays.asList("1-2", "2-3"));
            Level level3 = new Level(LevelType.TYPE_A, 10, 5, 6, 5, Arrays.asList("1-3", "3-2", "2-4", "4-5", "5-6"));
            Level level4 = new Level(LevelType.TYPE_B, 15, 10, 4, 3, Arrays.asList("1-2", "2-3", "3-4"));
            levelRepository.saveAll(Arrays.asList(level1, level2, level3, level4));

            // Seed UserLevel Data
            Random random = new Random();
            List<User> users = userRepository.findAll();
            List<Level> levels = levelRepository.findAll();

            levels.forEach(level -> {
                users.forEach(user -> {
                    long completionTime = level.getPoints() == 10 ? (long) (random.nextInt(30) + 30)*1000 : (long) (random.nextInt(10) + 20)*1000; // Adjust time range based on points
                    int score = calculateScore(level.getPoints(), completionTime);
                    UserLevel userLevel = new UserLevel(user, level, true, completionTime, score);
                    if(random.nextBoolean()) userLevelRepository.save(userLevel);
                });
            });
        };
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
}