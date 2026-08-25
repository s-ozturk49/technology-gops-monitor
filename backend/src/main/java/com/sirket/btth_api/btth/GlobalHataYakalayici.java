package com.sirket.btth_api.btth;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalHataYakalayici {

    public record HataCevabi(
        String hataKodu,
        String mesaj,
        Map<String, String> alanHatalari,
        String zaman
    ) {}

    @ExceptionHandler(KayitBulunamadiException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public HataCevabi bulunamadi(KayitBulunamadiException ex) {
        return new HataCevabi(
            "KAYIT_BULUNAMADI",
            ex.getMessage(),
            Map.of(),
            Instant.now().toString()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public HataCevabi validasyon(MethodArgumentNotValidException ex) {
        var alanlar = ex.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                f -> f.getDefaultMessage() == null ? "Geçersiz" : f.getDefaultMessage(),
                (a, b) -> a
            ));

        return new HataCevabi(
            "VALIDASYON_HATASI",
            "Girdi doğrulanamadı",
            alanlar,
            Instant.now().toString()
        );
    }
}