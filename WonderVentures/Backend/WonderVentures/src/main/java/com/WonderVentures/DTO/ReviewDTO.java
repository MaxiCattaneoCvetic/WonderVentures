package com.WonderVentures.DTO;


import com.WonderVentures.entity.Experience;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewDTO {

    private Long id;
    private String comment;
    private LocalDate date;
    private Double score;
    private PersonDTO user;
    private Experience experience;
}
