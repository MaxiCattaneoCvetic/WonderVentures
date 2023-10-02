package com.WonderVentures.repository;

import com.WonderVentures.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByExperienceId(Long experienceId);
}
