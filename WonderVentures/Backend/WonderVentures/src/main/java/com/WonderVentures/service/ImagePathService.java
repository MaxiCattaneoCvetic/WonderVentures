package com.WonderVentures.service;

import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.DTO.ImagePathDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.entity.ImagePath;
import com.WonderVentures.repository.ImagePathRepository;
import com.WonderVentures.repository.ExperienceRepository;
import com.WonderVentures.service.serviceInterface.IserviceImagePath;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

@Service
public class ImagePathService implements IserviceImagePath {

    @Autowired
    private ImagePathRepository imagePathRepository;
    @Autowired
    private ExperienceRepository experienceRepository;
    @Autowired
    ObjectMapper mapper;
    Logger logger = Logger.getLogger(ImagePathService.class);
    @Override
    public Set<ImagePathDTO> searchAllIcons() throws Exception{
        List<ImagePath> images = imagePathRepository.findAllIcons();

        Set<ImagePathDTO> imagePathDTOS = new TreeSet<>((image1, image2) -> image1.getId().compareTo(image2.getId()));

        for (ImagePath image : images) {
            imagePathDTOS.add(mapper.convertValue(image, ImagePathDTO.class));
        }

        return imagePathDTOS;
    }

    @Override
    public ImagePathDTO searchImageByID(Long id) throws Exception{
        logger.info("Buscando  imagen..");
        Optional<ImagePath> imgBuscada = imagePathRepository.findById(id);
        ImagePathDTO imagePathDTO = null;
        if(imgBuscada.isPresent()){
            imagePathDTO = mapper.convertValue(imgBuscada, ImagePathDTO.class);
            return imagePathDTO;
        }else{
            throw new Exception("Imagen no registrada");
        }
    }

    @Override
    public void deleteImagePath(Long id) {
        logger.info("Eliminando  imagen..");
        ImagePath deletedImagePath = imagePathRepository.findById(id).orElse(null);

        if (deletedImagePath != null) {
            // Buscar todas las experiencias que contengan la imagen borrada
            List<Experience> experiencesWithDeletedImage = experienceRepository.findByImagePath(deletedImagePath);

            // Eliminar la imagen borrada del array de imagePath en cada experiencia
            for (Experience experience : experiencesWithDeletedImage) {
                experience.getImagePath().remove(deletedImagePath);
            }

            // Guardar las experiencias actualizadas
            experienceRepository.saveAll(experiencesWithDeletedImage);

            // Finalmente, eliminar la ImagePath
            imagePathRepository.delete(deletedImagePath);
        }
    }
}
