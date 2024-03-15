package com.example.hackathon.model.entity;

import jakarta.persistence.*;

@Entity
public class UserLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Level level;

    private Boolean passed;

    // Constructors, Getters and Setters
}

