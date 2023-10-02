package com.WonderVentures.DTO;


import com.WonderVentures.entity.ImagePath;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
    private ImagePath icon;
}
