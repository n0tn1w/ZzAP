package com.example.hackathon.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL) // Optional: Exclude null fields
public class UserDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("division")
    private String division;

    @JsonProperty("score")
    private Integer score;

    public UserDTO() {
    }

    public UserDTO(Long id, String username, String division, Integer score) {
        this.id = id;
        this.username = username;
        this.division = division;
        this.score = score;
    }

}
