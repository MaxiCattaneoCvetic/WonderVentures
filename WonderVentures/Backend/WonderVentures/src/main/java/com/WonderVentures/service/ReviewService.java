package com.WonderVentures.service;

import com.WonderVentures.DTO.BookingDTO;
import com.WonderVentures.DTO.ReviewDTO;
import com.WonderVentures.entity.Booking;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Review;
import com.WonderVentures.repository.ReviewRepository;
import com.WonderVentures.service.serviceInterface.IserviceReview;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.devtools.filewatch.SnapshotStateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService implements IserviceReview {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void createReview(ReviewDTO reviewDTO) {
        // Convierte el DTO a una entidad Review y guárdala en la base de datos
        Review review = objectMapper.convertValue(reviewDTO, Review.class);
        review.setDate(LocalDate.now()); // Opcional: establecer la fecha actual
        reviewRepository.save(review);
    }

    @Override
    public List<ReviewDTO> getAllReviews() {
        // Recupera todas las revisiones de la base de datos y conviértelas en DTOs
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream().map(review -> objectMapper.convertValue(review, ReviewDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO getReviewById(Long id) {
        // Busca una revisión por su ID y conviértela en un DTO si se encuentra
        Optional<Review> optionalReview = reviewRepository.findById(id);
        return optionalReview.map(review -> objectMapper.convertValue(review, ReviewDTO.class)).orElse(null);
    }

    @Override
    public void updateReview(Long id, ReviewDTO updatedReviewDTO) {
        // Actualiza una revisión existente por su ID
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            // Actualiza los campos necesarios (score y comment en este caso)
            review.setScore(updatedReviewDTO.getScore());
            review.setComment(updatedReviewDTO.getComment());
            reviewRepository.save(review);
        }
    }

    @Override
    public void deleteReview(Long id) {
        // Elimina una revisión por su ID
        reviewRepository.deleteById(id);
    }

    @Override
    public List<ReviewDTO> getReviewsOfExperience(Long experienceId) {
        List<Review> reviews = reviewRepository.findByExperienceId(experienceId);
        return reviews.stream()
                .map(booking -> objectMapper.convertValue(booking, ReviewDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Review> findByExperienceId(Long id) {
        return reviewRepository.findByExperienceId(id);
    }
}
