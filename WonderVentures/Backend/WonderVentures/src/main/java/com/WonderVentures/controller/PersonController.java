package com.WonderVentures.controller;


import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.entity.Category;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.exception.ErrorResponse;
import com.WonderVentures.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping("find/{email}")
    public ResponseEntity<?> searchUserByEmail(@PathVariable String email) {
        PersonDTO userBusc = personService.searchUserByEmail(email);
        if (userBusc != null) {
            return ResponseEntity.ok(userBusc);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Collection<PersonDTO>> getAllUsers() {
        return ResponseEntity.ok(personService.searchAllUser());
    }

    @PutMapping("/update/favExperiences")
    public ResponseEntity<?> updateUser(@RequestBody PersonDTO personDTO) {
        try{
            // Obtén las experiencias favoritas de la persona
            List<Experience> favExperiences = personDTO.getFavExperiences();
            // Crear un mapa para rastrear categorías por su ID
            Map<Long, Category> categoryMap = new HashMap<>();
            // Recorre las experiencias para asegurarte de que compartan la misma categoría
            for (Experience experience : favExperiences) {
                Category category = experience.getCategory();
                if (category != null) {
                    // Si la categoría ya está en el mapa, úsala
                    if (categoryMap.containsKey(category.getId())) {
                        experience.setCategory(categoryMap.get(category.getId()));
                    } else {
                        // Si la categoría no está en el mapa, agrégala al mapa
                        categoryMap.put(category.getId(), category);
                    }
                }
            }
            // Luego de procesar todas las experiencias, todas las que compartan la misma
            // categoría tendrán la misma instancia de Category asignada
            // Ahora puedes actualizar la persona con las experiencias actualizadas
            personDTO.setFavExperiences(favExperiences);
            // Llama al servicio para actualizar la persona
            PersonDTO personDTOUpdated = personService.updateUserFavsExperiences(personDTO);
            return ResponseEntity.ok(personDTOUpdated);
        } catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
    @DeleteMapping("delete/{email}")
    public ResponseEntity<?> userDelete(@PathVariable String email) {
        PersonDTO userSearch = personService.searchUserByEmail(email);
        if (userSearch != null) {
            personService.deleteUser(email);
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().build();
        }


    }

    @DeleteMapping("deleteId/{id}")
    public ResponseEntity<?> userDeleteId(@PathVariable Long id) {
        PersonDTO userSearch = personService.searchUserByID(id);
        if (userSearch != null) {
            personService.deleteUserbyId(id);
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}











