package com.WonderVentures.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.WonderVentures.entity.Category;
public interface CategoryRepository extends JpaRepository<Category,Long> {


}
