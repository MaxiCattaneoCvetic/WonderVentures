package com.WonderVentures.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experiencias")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double price;

    @Column
    private String name;

    @Column
    private String location;

    @Column
    private String description;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonProperty("category")
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonProperty("activities")
    private List<Activity> activities = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonProperty("imagePath")
    private List<ImagePath> imagePath = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonProperty("politics")
    private List<Politic> politics = new ArrayList<>();

}
