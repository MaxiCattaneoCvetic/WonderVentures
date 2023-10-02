package com.WonderVentures.controller;

import com.WonderVentures.DTO.BookingDTO;
import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.entity.Booking;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Person;
import com.WonderVentures.repository.ExperienceRepository;
import com.WonderVentures.repository.PersonRepository;
import com.WonderVentures.service.BookingService;
import com.WonderVentures.service.PersonService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private PersonService personService;

    @Autowired
    ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> crearBooking(@RequestBody BookingDTO bookingDTO) {
        try {
            Optional<Experience> experience= experienceRepository.findById(bookingDTO.getExperience().getId());
            experience.ifPresent(bookingDTO::setExperience);
            Optional<Person> person = personRepository.findByUsername(bookingDTO.getUser().getUsername());
            if(person.isPresent()){
                PersonDTO personDTO = mapper.convertValue(person.get(), PersonDTO.class);
                bookingDTO.setUser(personDTO);
            }
            bookingService.crearBooking(bookingDTO);
            return ResponseEntity.ok("Reserva creada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la reserva: " + e.getMessage());
        }
    }

    // Endpoint para obtener todas las reservas
    @GetMapping("/all")
    public List<BookingDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Endpoint para obtener reservas de una experiencia específica por su ID
    @GetMapping("/experience/{experienceId}")
    public List<BookingDTO> getBookingsOfExperience(@PathVariable Long experienceId) {
        return bookingService.getBookingsOfExperience(experienceId);
    }
    @GetMapping("/{correo}")
    public List<BookingDTO> getBookingsOfUser(@PathVariable String correo){
        PersonDTO userBusc = personService.searchUserByEmail(correo);
        String email = userBusc.getUsername();
        return bookingService.getBookingsOfUser(email);

    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<String> updateBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingDTO updatedBookingDTO) {

        // Verificar si la reserva con el ID proporcionado existe en la base de datos
        Optional<Booking> bookingOptional = bookingService.findById(bookingId);

        if (bookingOptional.isPresent()) {
            Booking bookingToUpdate = bookingOptional.get();
            // Actualizar las fechas de inicio y finalización de la reserva
            bookingToUpdate.setStartDate(updatedBookingDTO.getStartDate());
            bookingToUpdate.setEndDate(updatedBookingDTO.getEndDate());

            // Guardar la reserva actualizada en la base de datos
            bookingService.updateBooking(bookingToUpdate);

            return ResponseEntity.ok("Reserva actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long bookingId) {
        // Verificar si la reserva con el ID proporcionado existe en la base de datos
        Optional<Booking> bookingOptional = bookingService.findById(bookingId);

        if (bookingOptional.isPresent()) {
            // Eliminar la reserva de la base de datos
            bookingService.deleteBooking(bookingId);
            return ResponseEntity.ok("Reserva eliminada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
