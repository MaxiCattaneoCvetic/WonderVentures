package com.WonderVentures.service.serviceInterface;

import com.WonderVentures.DTO.BookingDTO;
import com.WonderVentures.DTO.ReviewDTO;
import com.WonderVentures.entity.Review;

import java.util.List;

public interface IserviceReview {
    void createReview(ReviewDTO reviewDTO);
    List<ReviewDTO> getAllReviews();
    ReviewDTO getReviewById(Long id);
    void updateReview(Long id, ReviewDTO updatedReviewDTO);
    void deleteReview(Long id);
    List<ReviewDTO> getReviewsOfExperience(Long experienceId);
    List<Review> findByExperienceId(Long id);

}
