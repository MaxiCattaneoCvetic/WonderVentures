package com.WonderVentures.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="reviews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String comment;
    @Column
    private LocalDate date;
    @Column
    private Double score;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonProperty("user")
    private Person user;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonProperty("experience")
    private Experience experience;

}
