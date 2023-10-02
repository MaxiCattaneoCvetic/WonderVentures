package com.WonderVentures.service;

import com.WonderVentures.DTO.CategoryDTO;
import com.WonderVentures.entity.Category;
import com.WonderVentures.repository.CategoryRepository;
import com.WonderVentures.service.serviceInterface.IserviceCategory;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

@Service
public class CategoryService implements IserviceCategory {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    ObjectMapper mapper;
    Logger logger = Logger.getLogger(CategoryService.class);

    @Override
    public void create(CategoryDTO categoryDTO) {
        Category category = mapper.convertValue(categoryDTO, Category.class);
        logger.info("Saving category.. :)");
        categoryRepository.save(category);
    }

    @Override
    public Set<CategoryDTO> searchAll() {
        logger.info("Buscando todos las categorías..");
        List<Category> categories = categoryRepository.findAll(Sort.by("id"));
        Set<CategoryDTO> categoryDTOS = new TreeSet<>((cat1, cat2) -> cat1.getId().compareTo(cat2.getId()));
        for(Category category:categories){
            categoryDTOS.add(mapper.convertValue(category, CategoryDTO.class));

        }
        return categoryDTOS;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }


}
