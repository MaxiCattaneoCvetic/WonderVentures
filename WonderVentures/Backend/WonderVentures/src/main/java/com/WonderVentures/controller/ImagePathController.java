package com.WonderVentures.controller;

import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.DTO.ImagePathDTO;
import com.WonderVentures.entity.ImagePath;
import com.WonderVentures.exception.ErrorResponse;
import com.WonderVentures.service.ExperienceService;
import com.WonderVentures.service.ImagePathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/images")
public class ImagePathController {

    @Autowired
    private ImagePathService imagePathService;

    @GetMapping("/icons")
    public ResponseEntity<?> getAllIcons(){
        try{
            Set<ImagePathDTO> imagePathDTOs = imagePathService.searchAllIcons();
            return ResponseEntity.ok(imagePathDTOs);
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<?> deleteImage(@PathVariable Long id){
        try{
            ImagePathDTO imgBuscada = imagePathService.searchImageByID(id);
            imagePathService.deleteImagePath(imgBuscada.getId());
            return ResponseEntity.ok(HttpStatus.OK);
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
