package com.WonderVentures.controller;

import com.WonderVentures.DTO.BookingDTO;
import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.DTO.ReviewDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Person;
import com.WonderVentures.repository.ExperienceRepository;
import com.WonderVentures.repository.PersonRepository;
import com.WonderVentures.service.PersonService;
import com.WonderVentures.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private ObjectMapper mapper;

    // Ruta para crear una nueva revisión
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewDTO reviewDTO) {
        Optional<Experience> experience = experienceRepository.findById(reviewDTO.getExperience().getId());
        experience.ifPresent(reviewDTO::setExperience);
        Optional<Person> person = personRepository.findById(reviewDTO.getUser().getId());
        if (person.isPresent()) {
            PersonDTO personDTO = mapper.convertValue(person.get(), PersonDTO.class);
            reviewDTO.setUser(personDTO);
        }

        reviewService.createReview(reviewDTO); // Implementa este método en tu servicio
        return ResponseEntity.ok("Revisión creada con éxito");
    }

    // Ruta para obtener todas las revisiones
    @GetMapping("/getAll")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> reviews = reviewService.getAllReviews(); // Implementa este método en tu servicio
        return ResponseEntity.ok(reviews);
    }

    // Ruta para obtener una revisión por su ID
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        ReviewDTO review = reviewService.getReviewById(id); // Implementa este método en tu servicio
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/experience/{experienceId}")
    public List<ReviewDTO> getReviewsOfExperience(@PathVariable Long experienceId) {
        return reviewService.getReviewsOfExperience(experienceId);
    }

    // Ruta para actualizar una revisión
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody ReviewDTO updatedReviewDTO) {
        // Lógica para actualizar la revisión (score y comment)
        reviewService.updateReview(id, updatedReviewDTO); // Implementa este método en tu servicio
        return ResponseEntity.ok("Revisión actualizada con éxito");
    }

    // Ruta para eliminar una revisión por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id); // Implementa este método en tu servicio
        return ResponseEntity.ok("Revisión eliminada con éxito");
    }
}
