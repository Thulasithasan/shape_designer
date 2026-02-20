package com.thulasi.shape_designer.service.impl;

import com.thulasi.shape_designer.dto.Request.ShapeCreateRequest;
import com.thulasi.shape_designer.dto.Request.ShapeUpdateRequest;
import com.thulasi.shape_designer.dto.response.DimensionDto;
import com.thulasi.shape_designer.dto.response.ResponseEntityDto;
import com.thulasi.shape_designer.dto.response.ShapeDto;
import com.thulasi.shape_designer.model.Shape;
import com.thulasi.shape_designer.repository.ShapeRepository;
import com.thulasi.shape_designer.service.ShapeService;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Builder
@RequiredArgsConstructor
public class ShapeServiceImpl implements ShapeService {

    private final ShapeRepository shapeRepository;

    @Override
    public ResponseEntityDto<ShapeDto> createShape(ShapeCreateRequest request) {
        validateShapeName(request.getName());
        validateDimension(request.getDimension(), request.getType());
        Shape shape = buildShapeFromCreateRequest(request);
        shapeRepository.save(shape);
        return ResponseEntityDto.success("Shape created successfully", convertToDto(shape));
    }

    @Override
    public ResponseEntityDto<ShapeDto> getShapeById(Long id) {
        Optional<Shape> shapeOptional = shapeRepository.findById(id);

        if (shapeOptional.isPresent()) {
            Shape shape = shapeOptional.get();
            return ResponseEntityDto.success("Shape retrieved successfully", convertToDto(shape));
        } else {
            return ResponseEntityDto.error("Shape not found with id: " + id);
        }
    }

    @Override
    public ResponseEntityDto<List<ShapeDto>> getAllShapes() {
        List<Shape> shapes = shapeRepository.findAll();
        List<ShapeDto> shapeDtos = shapes.stream()
                .map(this::convertToDto)
                .toList();
        return ResponseEntityDto.success("Shapes retrieved successfully", shapeDtos);
    }

    @Override
    public ResponseEntityDto<ShapeDto> updateShape(Long id, ShapeUpdateRequest request) {
        Optional<Shape> shapeOptional = shapeRepository.findById(id);

        if (shapeOptional.isPresent()) {
            Shape existShape = shapeOptional.get();
            defaultDataValidation(existShape.getName());

            if (!Objects.equals(request.getName(), existShape.getName())) {
                validateShapeName(request.getName());
            }
            validateDimension(request.getDimension(), request.getType());
            Shape shape = shapeOptional.get();
            shape.setName(request.getName());
            shape.setType(request.getType());
            shape.setDimensionData(request.getDimension());
            shapeRepository.save(shape);
            return ResponseEntityDto.success("Shape updated successfully", convertToDto(shape));
        } else {
            return ResponseEntityDto.error("Shape not found with id: " + id);
        }
    }

    @Override
    public ResponseEntityDto<Void> deleteShape(Long id) {
        Optional<Shape> shapeOptional = shapeRepository.findById(id);

        if (shapeOptional.isPresent()) {
            defaultDataValidation(shapeOptional.get().getName());
            shapeRepository.deleteById(id);
            return ResponseEntityDto.success("Shape deleted successfully", null);
        } else {
            return ResponseEntityDto.error("Shape not found with id: " + id);
        }
    }

    private Shape buildShapeFromCreateRequest(ShapeCreateRequest request) {
        return Shape.builder()
                .name(request.getName())
                .type(request.getType())
                .dimensionData(request.getDimension())
                .build();
    }

    private ShapeDto convertToDto(Shape shape) {
        return ShapeDto.builder()
                .id(shape.getId())
                .name(shape.getName())
                .type(shape.getType())
                .dimensionData(shape.getDimensionData())
                .createdAt(shape.getCreatedAt())
                .build();
    }

    private void validateShapeName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Shape name cannot be empty");
        }

        if (shapeRepository.existsByName(name)) {
            throw new IllegalArgumentException("Cannot create or update with the same name");
        }
    }

    private void validateDimension(DimensionDto dimensionDto, String type) {

        if (type == null || dimensionDto == null) {
            throw new IllegalArgumentException("Invalid shape data");
        }

        switch (type.toUpperCase()) {
            case "RECTANGLE":
            case "TRIANGLE":
                if (dimensionDto.getWidth() <= 0 || dimensionDto.getHeight() <= 0) {
                    throw new IllegalArgumentException("Width and Height must be greater than 0");
                }
                break;

            case "CIRCLE":
                if (dimensionDto.getRadius() <= 0) {
                    throw new IllegalArgumentException("Radius must be greater than 0");
                }
                break;

            default:
                throw new IllegalArgumentException("Invalid shape type");
        }
    }

    private void defaultDataValidation(String name) {
        if ("Default Rectangle".equals(name) ||
                "Default Circle".equals(name) ||
                "Default Triangle".equals(name)) {
            throw new IllegalArgumentException("Default data cannot be updated or deleted");
        }
    }
}
