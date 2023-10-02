package com.WonderVentures.Jwt.loginAndRegisterRequest;
import com.WonderVentures.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {


    private String name;

    private String surname;

    private String username;

    private String password;
    private Role role;





}
