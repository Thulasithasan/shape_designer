package com.thulasi.shape_designer.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseEntityDto<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public ResponseEntityDto(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    public static <T> ResponseEntityDto<T> success(String message, T data) {
        return new ResponseEntityDto<>(true, message, data);
    }

    public static <T> ResponseEntityDto<T> error(String message) {
        return new ResponseEntityDto<>(false, message, null);
    }
}
