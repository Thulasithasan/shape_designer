package com.thulasi.shape_designer.model;

import com.thulasi.shape_designer.dto.response.DimensionDto;
import com.thulasi.shape_designer.util.converter.DimensionDtoConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shapes")
public class Shape {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String name;

    private String type;

    @Column(columnDefinition = "json")
    @Convert(converter = DimensionDtoConverter.class)
    private DimensionDto dimensionData;

    private LocalDateTime createdAt;
}
