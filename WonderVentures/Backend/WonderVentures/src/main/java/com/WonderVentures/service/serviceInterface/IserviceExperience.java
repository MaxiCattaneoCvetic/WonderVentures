package com.WonderVentures.service.serviceInterface;

import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.Review;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IserviceExperience {
    void createExperience(ExperienceDTO experienceDTO);
    void deleteExpereience(Long id);
    ExperienceDTO searchExperienceByID(Long id) throws Exception;
    void editExperience(ExperienceDTO experienceDTO);
    Set<ExperienceDTO> searchAllExperience();
    public void crear(ExperienceDTO experienceDTO);
    Set<ExperienceDTO> searchPaginatedExperience(Pageable pageable);
    void update(ExperienceDTO experienceDTO) throws Exception;
    Set<ExperienceDTO> searchExperiencesByNameAndAvailableDates(String name, LocalDate startDate, LocalDate endDate);
    List<Experience> findByCategoryId(Long id);


}
