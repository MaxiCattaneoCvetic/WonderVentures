package com.WonderVentures.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDate startDate;
    @Column
    private LocalDate endDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonProperty("user")
    private Person user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonProperty("experience")
    private Experience experience;

}
