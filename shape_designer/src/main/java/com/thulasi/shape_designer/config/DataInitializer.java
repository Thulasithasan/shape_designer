package com.thulasi.shape_designer.config;

import com.thulasi.shape_designer.dto.response.DimensionDto;
import com.thulasi.shape_designer.model.Shape;
import com.thulasi.shape_designer.repository.ShapeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ShapeRepository shapeRepository;

    public DataInitializer(ShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    @Override
    public void run(String... args) {
        if (!shapeRepository.existsByName("Default Rectangle")) {
            Shape rectangle = buildShape("Default Rectangle", "RECTANGLE", 100.0, 100.0, 0.0);
            shapeRepository.save(rectangle);

        }

        if (!shapeRepository.existsByName("Default Circle")) {
            Shape circle = buildShape("Default Circle", "CIRCLE", 0.0, 0.0, 50.0);
            shapeRepository.save(circle);

        }

        if (!shapeRepository.existsByName("Default Triangle")) {
            Shape triangle = buildShape("Default Triangle", "TRIANGLE", 100.0, 80.0, 0.0);
            shapeRepository.save(triangle);
        }
    }

    private Shape buildShape(String name, String type, double width, double height, double redius) {
        return Shape.builder()
                .name(name)
                .type(type)
                .dimensionData(DimensionDto.builder()
                        .height(height)
                        .width(width)
                        .radius(redius)
                        .build())
                .build();
    }

}
