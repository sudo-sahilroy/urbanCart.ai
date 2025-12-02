package com.urbancart.ai.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findByCategoryIgnoreCase(String category, Pageable pageable);
    Page<ProductEntity> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
