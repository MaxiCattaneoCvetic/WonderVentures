package com.WonderVentures.controller;

import com.WonderVentures.DTO.CategoryDTO;
import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.entity.Category;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Person;
import com.WonderVentures.entity.Review;
import com.WonderVentures.exception.ErrorResponse;
import com.WonderVentures.service.CategoryService;
import com.WonderVentures.service.ExperienceService;
import com.WonderVentures.service.PersonService;
import com.WonderVentures.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/experience")
public class ExperienceController {
    @Autowired
    private ExperienceService experienceService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private PersonService personService;
    @Autowired
    private ObjectMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<?> searchExperienceById(@PathVariable Long id ){
        try{
            ExperienceDTO expBuscada = experienceService.searchExperienceByID(id);
            return ResponseEntity.ok(expBuscada);
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("name/{name}/{startDate}/{endDate}")
    public ResponseEntity<Collection<ExperienceDTO>> searchExperienceByNameAndAvailableDates(
            @PathVariable String name,
            @PathVariable LocalDate startDate,
            @PathVariable LocalDate endDate){
        try{
            Set<ExperienceDTO> expBuscadas = experienceService.searchExperiencesByNameAndAvailableDates(name, startDate, endDate);
            return ResponseEntity.ok(expBuscadas);
        }catch (Exception e){
            Set<ExperienceDTO> expNo = null;
            return ResponseEntity.badRequest().body(expNo);

        }
    }

    @GetMapping("/all")
    public ResponseEntity<Collection<ExperienceDTO>> getAllExperiences(
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "page", required = false) Integer page){

        if (limit == null || page == null) {
            return ResponseEntity.ok(experienceService.searchAllExperience());
        }else {
            Pageable pageable = PageRequest.of(page, limit,  Sort.by("id"));
            return ResponseEntity.ok(experienceService.searchPaginatedExperience(pageable));
        }

    }

    @GetMapping("products")
    public ResponseEntity<Collection<ExperienceDTO>> getAllProduct()
        {
            return  ResponseEntity.ok(experienceService.searchAllExperience());

    }

    @PostMapping("/add")
    //todo lo que venga por el cuerpo del JSON
    public ResponseEntity<?> addExperience(@RequestBody ExperienceDTO experienceDTO ) {
        //traer todas las experiencias
        Set<ExperienceDTO> experienceDTOS = experienceService.searchAllExperience();
        for (ExperienceDTO expDto : experienceDTOS) {
            if (expDto.getName().equals(experienceDTO.getName())) {
                return ResponseEntity.badRequest().body("No se puede agregar con un mismo nombre");
            }
        }

        experienceService.crear(experienceDTO);
        return ResponseEntity.ok("Experiencia creada");
    }


   @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ExperienceDTO experienceDTO) throws Exception {
        try {
            ExperienceDTO  exp = experienceService.searchExperienceByID(experienceDTO.getId());
            // Cargar la categoría existente desde la base de datos
            experienceService.update(experienceDTO);
            return ResponseEntity.ok(HttpStatus.OK);
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteExperienceById(@PathVariable Long id) {
        try{
            List<Review> reviewsToDelete = reviewService.findByExperienceId(id);
            // 2. Elimina cada experiencia.
            for (Review review : reviewsToDelete) {
                reviewService.deleteReview(review.getId());
            }
            ExperienceDTO expBuscada = experienceService.searchExperienceByID(id);
            experienceService.deleteExpereience(expBuscada.getId());
            return ResponseEntity.ok(HttpStatus.OK);
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

}
