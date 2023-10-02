package com.WonderVentures.repository;

import com.WonderVentures.entity.Category;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.ImagePath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience,Long> {
    @Query("SELECT e FROM Experience e JOIN e.imagePath img WHERE img = :imagePath")
    List<Experience> findByImagePath(@Param("imagePath") ImagePath imagePath);

    List<Experience> findByCategoryId(Long id);

    @Query("SELECT b.experience.id FROM Booking b " +
            "WHERE (b.startDate BETWEEN :startDate AND :endDate) " +
            "   OR (b.endDate BETWEEN :startDate AND :endDate) " +
            "   OR (:startDate BETWEEN b.startDate AND b.endDate) " +
            "   OR (:endDate BETWEEN b.startDate AND b.endDate)")
    List<Long> findBookingsInDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT e FROM Experience e " +
            "WHERE e.name LIKE %:name% OR e.location LIKE %:name%")
    List<Experience> findByKeyword(@Param("name") String name);

}
