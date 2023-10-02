package com.WonderVentures.Jwt;

import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    String token;
    String userName;
    String userLastName;
    Role userRol;
    String userEmail;
    List<Experience> favExperiences;


}


