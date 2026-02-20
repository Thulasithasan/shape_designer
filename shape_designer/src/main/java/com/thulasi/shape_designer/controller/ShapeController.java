package com.thulasi.shape_designer.controller;

import com.thulasi.shape_designer.dto.Request.ShapeCreateRequest;
import com.thulasi.shape_designer.dto.Request.ShapeUpdateRequest;
import com.thulasi.shape_designer.dto.response.ResponseEntityDto;
import com.thulasi.shape_designer.dto.response.ShapeDto;
import com.thulasi.shape_designer.service.ShapeService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
@RequiredArgsConstructor
public class ShapeController {

    private final ShapeService shapeService;

    @PostMapping
    public ResponseEntity<ResponseEntityDto<ShapeDto>> createShape(@RequestBody ShapeCreateRequest request) {
        return ResponseEntity.ok(shapeService.createShape(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseEntityDto<ShapeDto>> getShapeById(@PathVariable Long id) {
        return ResponseEntity.ok(shapeService.getShapeById(id));
    }

    @GetMapping
    public ResponseEntity<ResponseEntityDto<List<ShapeDto>>> getAllShapes() {
        return ResponseEntity.ok(shapeService.getAllShapes()); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseEntityDto<ShapeDto>> updateShape(@PathVariable Long id, @RequestBody ShapeUpdateRequest request) {
        return ResponseEntity.ok(shapeService.updateShape(id, request)); 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseEntityDto<Void>> deleteShape(@PathVariable Long id) {
        return ResponseEntity.ok(shapeService.deleteShape(id));
    }
}
