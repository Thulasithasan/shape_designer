package com.thulasi.shape_designer.dto.Request;

import com.thulasi.shape_designer.dto.response.DimensionDto;
import lombok.Data;

@Data
public class ShapeUpdateRequest {
    private String name;
    private String type;
    private DimensionDto dimension;
}
