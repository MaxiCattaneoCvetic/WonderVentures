package com.WonderVentures.service;
import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Person;
import com.WonderVentures.repository.PersonRepository;
import com.WonderVentures.service.serviceInterface.IservicePerson;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
@Service
public class PersonService implements IservicePerson {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    ObjectMapper mapper;

    Logger logger = Logger.getLogger(PersonService.class);

    public void update (PersonDTO personDTO) {
        Person person = mapper.convertValue(personDTO,Person.class);
        Optional<Person> persBusc = personRepository.findById(person.getId());
        if(persBusc.isPresent()){
            crear(personDTO);
            logger.info("updatingUser");
        }
        else {
            logger.error("updatingUser ERROR");
        }

    }

    @Override
    public void createUser(PersonDTO personDTO) {
        Person user = mapper.convertValue(personDTO, Person.class);
        personRepository.save(user);

    }

    @Override
    public void deleteUser(String email) {
        PersonDTO personDTO =  searchUserByEmail(email);
        if (personDTO != null){
            personRepository.deleteById(personDTO.getId());
            ResponseEntity.ok("The user has been eliminated");

        }else{
            return;
        }


    }

    @Override
    public void deleteUserbyId(Long id) {
        PersonDTO personDTO =  searchUserByID(id);
        if (personDTO != null){
            personRepository.deleteById(personDTO.getId());
            ResponseEntity.ok("The user has been eliminated");

        }else{
            return;
        }

    }


    @Override
    public void crear(PersonDTO personDTO) {
        logger.info("Creando  Usuario..");
        createUser(personDTO);

    }

    @Override
    public ResponseEntity<String> loginUser(String email, String password) {
        logger.info("Logeando Usuario...");
        Optional<Person> userSearched = personRepository.findByUsername(email);
        PersonDTO personDTO = null;

        if(userSearched.isPresent()){
            logger.info("entre en el if...");
            personDTO = mapper.convertValue(userSearched, PersonDTO.class);
            if (personDTO.getUsername().equals(email) && personDTO.getPassword().equals(password)){

                return ResponseEntity.ok("Login successful");

            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @Override
    public void updateAll(List<Person> persons) {
        personRepository.saveAll(persons);
    }


    @Override
    public PersonDTO searchUserByEmail(String email) {
        Optional<Person> userSearched = personRepository.findByUsername(email);
        PersonDTO personDTO = null;
        if(userSearched.isPresent()){
            personDTO = mapper.convertValue(userSearched, PersonDTO.class);
            return  personDTO;
        }

        return  personDTO;

    }

    @Override
    public PersonDTO updateUserFavsExperiences(PersonDTO personDTO) {
        // Buscar la persona existente por su nombre de usuario
        Optional<Person> personToUpdate = personRepository.findByUsername(personDTO.getUsername());
        if (personToUpdate.isEmpty()) {
            // Manejar el caso en el que la persona no se encuentra
            throw new EntityNotFoundException("No se encontró la persona con el nombre de usuario: " + personDTO.getUsername());
        }
        // Actualizar las experiencias favoritas de la persona con las nuevas
        personToUpdate.get().setFavExperiences(personDTO.getFavExperiences());
        // Guardar la persona actualizada en la base de datos
        Person personUpdated = personRepository.save(personToUpdate.get());
        // Convertir y devolver la persona actualizada como DTO
        return mapper.convertValue(personUpdated, PersonDTO.class);
    }

    @Override
    public PersonDTO searchUserByID(Long id) {
        Optional<Person> userSearched = personRepository.findById(id);
        PersonDTO personDTO = null;
        if(userSearched.isPresent()){
            personDTO = mapper.convertValue(userSearched, PersonDTO.class);
            return  personDTO;
        }

        return  personDTO;

    }


    @Override
    public Set<PersonDTO> searchAllUser() {
        logger.info("Looking for all users..");
        List<Person> personList = personRepository.findAll();
        Set<PersonDTO> personDTOS = new HashSet<>();
        for (Person person:personList){
            personDTOS.add(mapper.convertValue(person,PersonDTO.class));

        }
        return personDTOS;

    }


}
