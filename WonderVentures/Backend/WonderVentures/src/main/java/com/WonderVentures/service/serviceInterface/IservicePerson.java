package com.WonderVentures.service.serviceInterface;


import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Person;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface IservicePerson {

    void createUser(PersonDTO personDTO);
    void deleteUser(String email);
    void deleteUserbyId(Long id);
    PersonDTO searchUserByEmail(String email);
    PersonDTO updateUserFavsExperiences(PersonDTO personDTO);
    PersonDTO searchUserByID(Long id);
    Set<PersonDTO> searchAllUser();
    public void crear(PersonDTO personDTO);
    void update(PersonDTO personDTO);
    ResponseEntity<String> loginUser(String email, String password);
    void updateAll(List<Person> persons);
}
