package com.WonderVentures.repository;

import com.WonderVentures.entity.ImagePath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImagePathRepository extends JpaRepository<ImagePath, Long> {
    @Query("SELECT i FROM ImagePath i WHERE i.isIcon = true")
    List<ImagePath> findAllIcons();
}
