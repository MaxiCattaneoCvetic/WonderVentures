package com.WonderVentures.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImagePath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único del objeto ImagePath en la base de datos

    @Column(length = 255)
    private String url;

    @Column(length = 255)
    private String identificador;

    @Column
    private Boolean isIcon = false;

}
