package com.WonderVentures.DTO;


import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Role;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonDTO {

    private Long id;

    private String name;

    private String surname;

    private String username;

    private String password;

    private Role role;

    private List<Experience> favExperiences;

}
