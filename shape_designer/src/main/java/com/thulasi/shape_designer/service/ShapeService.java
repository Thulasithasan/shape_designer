package com.thulasi.shape_designer.service;

import com.thulasi.shape_designer.dto.Request.ShapeCreateRequest;
import com.thulasi.shape_designer.dto.Request.ShapeUpdateRequest;
import com.thulasi.shape_designer.dto.response.ResponseEntityDto;
import com.thulasi.shape_designer.dto.response.ShapeDto;

import java.util.List;

public interface ShapeService {
    ResponseEntityDto<ShapeDto> createShape(ShapeCreateRequest request);

    ResponseEntityDto<ShapeDto> getShapeById(Long id);

    ResponseEntityDto<List<ShapeDto>> getAllShapes();

    ResponseEntityDto<ShapeDto> updateShape(Long id, ShapeUpdateRequest request);

    ResponseEntityDto<Void> deleteShape(Long id);
}
