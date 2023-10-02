package com.WonderVentures.service;

import com.WonderVentures.DTO.BookingDTO;
import com.WonderVentures.entity.Booking;
import com.WonderVentures.repository.BookingRepository;
import com.WonderVentures.service.serviceInterface.IserviceBooking;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService implements IserviceBooking {
    @Autowired
    private BookingRepository bookingRepository; // Asume que tienes un BookingRepository definido
    @Autowired
    ObjectMapper mapper;
    Logger logger = Logger.getLogger(BookingService.class);
    @Override
    public void crearBooking(BookingDTO bookingDTO) {
        Booking booking = mapper.convertValue(bookingDTO, Booking.class);
        // Guardar el Booking en la base de datos
        bookingRepository.save(booking);
    }

    // Obtener todas las reservas y convertirlas a DTOs
    @Override
    public List<BookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(booking -> mapper.convertValue(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }

    // Obtener reservas de una experiencia específica por su ID y convertirlas a DTOs
    @Override
    public List<BookingDTO> getBookingsOfExperience(Long experienceId) {
        List<Booking> bookings = bookingRepository.findByExperienceId(experienceId);
        return bookings.stream()
                .map(booking -> mapper.convertValue(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public void updateBooking(Booking booking) {
        // Implementa la lógica para actualizar la reserva
        bookingRepository.save(booking);
    }
    @Override
    public void deleteBooking(Long bookingId) {
        // Implementa la lógica para eliminar la reserva por ID
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public List<BookingDTO> getBookingsOfUser(String username) {
        List <Booking> bookings = bookingRepository.findByUserUsername(username);
        return bookings.stream()
                .map(booking -> mapper.convertValue(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Booking> findById(Long bookingId) {
        return bookingRepository.findById(bookingId);
    }
}
