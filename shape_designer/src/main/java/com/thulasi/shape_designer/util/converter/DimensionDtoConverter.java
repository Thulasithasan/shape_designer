package com.thulasi.shape_designer.util.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thulasi.shape_designer.dto.response.DimensionDto;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class DimensionDtoConverter implements AttributeConverter<DimensionDto, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(DimensionDto attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Could not convert DimensionDto to JSON", e);
        }
    }

    @Override
    public DimensionDto convertToEntityAttribute(String dbData) {
        try {
            if (dbData == null || dbData.isEmpty()) {
                return null;
            }
            return objectMapper.readValue(dbData, DimensionDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Could not convert JSON to DimensionDto", e);
        }
    }
}
