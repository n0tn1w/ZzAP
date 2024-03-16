package com.example.hackathon.seed;

import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.model.enums.LevelType;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository,
                                   LevelRepository levelRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {

            User user1 = new User("user1", passwordEncoder.encode("password"));
            User user2 = new User("user2", passwordEncoder.encode("password"));
            userRepository.save(user1);
            userRepository.save(user2);

            levelRepository.deleteAll();

            Level level1 = new Level();
            level1.setPoints(5);
            level1.setNumber(1);
            level1.setLevelType(LevelType.TYPE_A);
            level1.setNodesCount(5);
            level1.setEdgesCount(4);
            level1.setEdges(Arrays.asList("1-2", "2-3", "3-4", "4-5"));
            levelRepository.save(level1);


            Level level2 = new Level();
            level2.setLevelType(LevelType.TYPE_B);
            level2.setPoints(5);
            level2.setNumber(2);
            level2.setNodesCount(3);
            level2.setEdgesCount(2);
            level2.setEdges(Arrays.asList("1-2", "2-3"));
            levelRepository.save(level2);

        };
    }
}