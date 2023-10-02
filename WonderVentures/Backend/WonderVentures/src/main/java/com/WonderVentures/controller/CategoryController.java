package com.WonderVentures.controller;

import com.WonderVentures.DTO.CategoryDTO;
import com.WonderVentures.DTO.ExperienceDTO;
import com.WonderVentures.entity.Experience;
import com.WonderVentures.exception.ErrorResponse;
import com.WonderVentures.service.CategoryService;
import com.WonderVentures.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ExperienceService experienceService;

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO){
        try {
            categoryService.create(categoryDTO);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<Collection<CategoryDTO>> getAllCategories(){
        return ResponseEntity.ok(categoryService.searchAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Long id){
        try{
            // 1. Obtén todas las experiencias relacionadas con la categoría.
            List<Experience> experiencesToDelete = experienceService.findByCategoryId(id);
            // 2. Elimina cada experiencia.
            for (Experience experience : experiencesToDelete) {
                experienceService.deleteExpereience(experience.getId());
            }
            // 3. Finalmente, elimina la categoría.
            categoryService.deleteCategory(id);
            return ResponseEntity.ok(HttpStatus.OK);
        }catch (Exception e){
            String errorMessage = e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
