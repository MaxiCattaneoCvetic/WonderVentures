package com.WonderVentures.service;

import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.repository.ExperienceRepository;
import com.WonderVentures.service.serviceInterface.IserviceExperience;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExperienceService  implements IserviceExperience, PagingAndSortingRepository<Experience, Long> {
    @Autowired
    private ExperienceRepository experienceRepository;
    @Autowired
    ObjectMapper mapper;
    Logger logger = Logger.getLogger(ExperienceService.class);

    @Override
    public void createExperience(ExperienceDTO experienceDTO) {
        Experience experience = mapper.convertValue(experienceDTO, Experience.class);
        logger.info("Saving exp.. :)");
        experienceRepository.save(experience);

    }


    @Override
    public Set<ExperienceDTO> searchAllExperience() {
        logger.info("Buscando todos las Experiencias..");
        List<Experience> experiences = experienceRepository.findAll(Sort.by("id"));
        Set<ExperienceDTO> experienceDTOS = new TreeSet<>((exp1, exp2) -> exp1.getId().compareTo(exp2.getId()));
        for(Experience experience:experiences){
            experienceDTOS.add(mapper.convertValue(experience, ExperienceDTO.class));

        }
        return experienceDTOS;

    }


    @Override
    public Set<ExperienceDTO> searchExperiencesByNameAndAvailableDates(String name, LocalDate startDate, LocalDate endDate) {
        logger.info("Buscando experiencias por nombre y fechas disponibles");
        // Primero, obten todas las experiencias que coincidan con el nombre o la ubicación
        List<Experience> allExperiences = experienceRepository.findByKeyword(name);
        // Luego, obtén todas las reservas que se superponen con las fechas proporcionadas
        List<Long> bookedExperienceIds = experienceRepository.findBookingsInDateRange(startDate, endDate);
        // Filtra las experiencias que no tienen reservas en el rango de fechas
        List<Experience> availableExperiences = allExperiences.stream()
                .filter(e -> !bookedExperienceIds.contains(e.getId()))
                .toList();
        // Convierte las experiencias disponibles a DTO y ordénalas
        Set<ExperienceDTO> experienceDTOS = availableExperiences.stream()
                .map(experience -> mapper.convertValue(experience, ExperienceDTO.class))
                .collect(Collectors.toCollection(() -> new TreeSet<>((exp1, exp2) -> exp1.getId().compareTo(exp2.getId()))));

        return experienceDTOS;
    }

    @Override
    public List<Experience> findByCategoryId(Long id) {
        return experienceRepository.findByCategoryId(id);
    }


    @Override
    public Set<ExperienceDTO> searchPaginatedExperience(Pageable pageable) {
        logger.info("Buscando experiencias paginadas..");
        Page<Experience> experiences = experienceRepository.findAll(pageable);
        Set<ExperienceDTO> experienceDTOS = new TreeSet<>((exp1, exp2) -> exp1.getId().compareTo(exp2.getId()));
        for(Experience experience:experiences){
            experienceDTOS.add(mapper.convertValue(experience, ExperienceDTO.class));

        }
        return experienceDTOS;

    }



    @Override
    public void update(ExperienceDTO experienceDTO) throws Exception{
        Experience experience = mapper.convertValue(experienceDTO,Experience.class);
        Optional<Experience> expBusc = experienceRepository.findById(experience.getId());
        if(expBusc.isPresent()){
            crear(experienceDTO);
            logger.info("updating exp");
        }
        else {
            logger.error("update error");
        }

    }



    @Override
    public void crear(ExperienceDTO experienceDTO) {
        System.out.println("experienceDTO = " + experienceDTO);
        logger.info("Creando  experiencia..");
        createExperience(experienceDTO);
    }

    @Override
    public void deleteExpereience(Long id) {
        logger.info("Eliminando  experiencia..");
        experienceRepository.deleteById(id);
    }

    @Override
    public ExperienceDTO searchExperienceByID(Long id) throws Exception{
        logger.info("Buscando  experiencia..");
        Optional<Experience> expBuscada = experienceRepository.findById(id);
        ExperienceDTO experienceDTO = null;
        if(expBuscada.isPresent()){
            experienceDTO = mapper.convertValue(expBuscada, ExperienceDTO.class);
            return experienceDTO;
        }else{
            throw new Exception("Experiencia no registrada");
        }
    }

    @Override
    public void editExperience(ExperienceDTO experienceDTO) {
        logger.info("modificando exp");
        createExperience(experienceDTO);
    }

    @Override
    public Iterable<Experience> findAll(Sort sort) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public Page<Experience> findAll(Pageable pageable) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
