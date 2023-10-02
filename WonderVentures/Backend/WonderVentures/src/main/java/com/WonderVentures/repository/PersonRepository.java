package com.WonderVentures.repository;

import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person,Long> {

    Optional<Person> findByUsername(String username);

}
