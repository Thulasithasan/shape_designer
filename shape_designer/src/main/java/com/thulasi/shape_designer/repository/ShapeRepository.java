package com.thulasi.shape_designer.repository;

import com.thulasi.shape_designer.model.Shape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShapeRepository extends JpaRepository<Shape, Long> {

    boolean existsByName(String name);
}
