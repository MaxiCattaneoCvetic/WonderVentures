package com.WonderVentures.DTO;


import com.WonderVentures.entity.Activity;
import com.WonderVentures.entity.Category;
import com.WonderVentures.entity.ImagePath;
import com.WonderVentures.entity.Politic;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ExperienceDTO {

    private Long id;

    private Double price;

    private String name;

    private String location;

    private String description;

    private Category category;

    private List<ImagePath> imagePath;

    private List<Activity> activities;

    private List<Politic> politics;


    @Override
    public String toString() {
        return "ExperienceDTO{" +
                "id=" + id +
                ", price=" + price +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", category=" + category +
                ", imagePath=" + imagePath +
                ", activities=" + activities +
                '}';
    }
}
