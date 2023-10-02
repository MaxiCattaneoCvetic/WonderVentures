package com.WonderVentures.controller.auth;

import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.Jwt.AuthResponse;
import com.WonderVentures.Jwt.loginAndRegisterRequest.LoginRequest;
import com.WonderVentures.Jwt.loginAndRegisterRequest.RegisterRequest;

import com.WonderVentures.exception.ErrorResponse;

import com.WonderVentures.service.AuthService;
import com.WonderVentures.service.PersonService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PersonService personService;



    @PostMapping(value = "login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        AuthResponse response = new AuthResponse(); // Crear la variable response
        try {
            response = authService.login(request); // Configurar la respuesta exitos
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
        // Devolver la respuesta configurada
        return ResponseEntity.ok(response);
    }


    @PostMapping(value = "new")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        //aca tengo que buscar primero que el correo no este registrado
        return  ResponseEntity.ok(authService.register(request));

    }

    @PutMapping(value = "role")
    public ResponseEntity<?> updateUserRole(@RequestBody PersonDTO personDTO ){
        try {
            PersonDTO persDt = personService.searchUserByID(personDTO.getId());
            personService.update(personDTO);
            return ResponseEntity.ok("EL usuario " +  personDTO.getName() + " cambio de rol");
        }catch (Exception e){
            String errorMensaje = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMensaje);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

        }




    }


}
