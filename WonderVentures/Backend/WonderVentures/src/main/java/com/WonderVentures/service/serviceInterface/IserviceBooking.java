package com.WonderVentures.service.serviceInterface;

import com.WonderVentures.DTO.BookingDTO;
import com.WonderVentures.entity.Booking;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface IserviceBooking {
    void crearBooking(BookingDTO bookingDTO);
    List<BookingDTO> getBookingsOfExperience(Long experienceId);
    List<BookingDTO> getAllBookings();
    void updateBooking(Booking booking);
    void deleteBooking(Long bookingId);
    List<BookingDTO> getBookingsOfUser(String username);
    Optional<Booking> findById(Long bookingId);
}
