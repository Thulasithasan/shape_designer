package com.thulasi.shape_designer.model;

import com.thulasi.shape_designer.dto.response.DimensionDto;
import com.thulasi.shape_designer.util.converter.DimensionDtoConverter;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
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

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
