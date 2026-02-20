package com.thulasi.shape_designer.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ShapeDto {
    private Long id;
    private String name;
    private String type;
    private DimensionDto dimensionData;
}
