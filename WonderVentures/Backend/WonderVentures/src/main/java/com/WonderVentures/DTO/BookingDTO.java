package com.WonderVentures.DTO;


import com.WonderVentures.entity.Experience;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private com.WonderVentures.DTO.PersonDTO user;
    private Experience experience;

}
