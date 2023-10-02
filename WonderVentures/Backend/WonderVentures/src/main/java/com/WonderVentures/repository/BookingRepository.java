package com.WonderVentures.repository;

import com.WonderVentures.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByExperienceId(Long experienceId);
    List<Booking> findByUserUsername(String username);
}
