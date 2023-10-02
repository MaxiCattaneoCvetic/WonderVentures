package com.WonderVentures.service.serviceInterface;

import com.WonderVentures.DTO.CategoryDTO;
import com.WonderVentures.entity.Category;

import java.util.Optional;
import java.util.Set;

public interface IserviceCategory {
    void create(CategoryDTO categoryDTO);
    Set<CategoryDTO> searchAll();
    void deleteCategory(Long id);
    Optional<Category> findById(Long id);
}
