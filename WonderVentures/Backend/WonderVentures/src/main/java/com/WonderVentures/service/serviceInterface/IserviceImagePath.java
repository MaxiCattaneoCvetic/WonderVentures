package com.WonderVentures.service.serviceInterface;

import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.DTO.ImagePathDTO;

import java.util.Set;

public interface IserviceImagePath {
    Set<ImagePathDTO> searchAllIcons() throws Exception;
    ImagePathDTO searchImageByID(Long id) throws Exception;
    void deleteImagePath(Long id);
}
