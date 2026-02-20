package com.thulasi.shape_designer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DimensionDto {
    private double width;
    private double height;
    private double radius;
}
