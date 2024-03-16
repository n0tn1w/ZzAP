package com.example.hackathon.seed;

import com.example.hackathon.model.entity.Level;
import com.example.hackathon.model.entity.User;
import com.example.hackathon.repository.LevelRepository;
import com.example.hackathon.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

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

            Level level1 = new Level(1, 5, "D:/stuff2/data/level1.ino");
            Level level2 = new Level(2, 10, "D:/stuff2/data/level2.ino");
            levelRepository.save(level1);
            levelRepository.save(level2);

        };
    }
}