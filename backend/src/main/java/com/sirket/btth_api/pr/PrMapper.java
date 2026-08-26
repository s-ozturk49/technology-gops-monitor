package com.sirket.btth_api.pr;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class PrMapper {

    public PrEntity toEntity(PrRequestDto dto) {
        if (dto == null) {
            return null;
        }

        PrEntity entity = new PrEntity();
        entity.setBaslik(dto.getBaslik());
        entity.setAciklama(dto.getAciklama());
        entity.setKokNeden(dto.getKokNeden());
        entity.setGeciciCozum(dto.getGeciciCozum());
        entity.setEtki(dto.getEtki());
        entity.setOncelik(dto.getOncelik());
        entity.setDurum(dto.getDurum());
        entity.setIliskiliKayitlar(listToString(dto.getIliskiliKayitlar()));
        entity.setSorumlu(dto.getSorumlu());

        return entity;
    }

    public PrResponseDto toResponseDto(PrEntity entity) {
        if (entity == null) {
            return null;
        }

        PrResponseDto dto = new PrResponseDto();
        dto.setId(entity.getId());
        dto.setBaslik(entity.getBaslik());
        dto.setAciklama(entity.getAciklama());
        dto.setKokNeden(entity.getKokNeden());
        dto.setGeciciCozum(entity.getGeciciCozum());
        dto.setEtki(entity.getEtki());
        dto.setOncelik(entity.getOncelik());
        dto.setDurum(entity.getDurum());
        dto.setIliskiliKayitlar(stringToList(entity.getIliskiliKayitlar()));
        dto.setSorumlu(entity.getSorumlu());
        dto.setOlusturmaTarihi(entity.getOlusturmaTarihi());
        dto.setKapanisTarihi(entity.getKapanisTarihi());

        return dto;
    }

    public void updateEntityFromDto(PrRequestDto dto, PrEntity entity) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setBaslik(dto.getBaslik());
        entity.setAciklama(dto.getAciklama());
        entity.setKokNeden(dto.getKokNeden());
        entity.setGeciciCozum(dto.getGeciciCozum());
        entity.setEtki(dto.getEtki());
        entity.setOncelik(dto.getOncelik());
        entity.setDurum(dto.getDurum());
        entity.setIliskiliKayitlar(listToString(dto.getIliskiliKayitlar()));
        entity.setSorumlu(dto.getSorumlu());
    }

    /**
     * List<String> nesnesini virgülle ayrılmış String metne dönüştürür.
     * Örn: ["BTTH-2026-0004", "BGVL-2026-0002"] -> "BTTH-2026-0004,BGVL-2026-0002"
     */
    private String listToString(List<String> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        return String.join(",", list.stream()
                .filter(item -> item != null && !item.isBlank())
                .map(String::trim)
                .toList());
    }

    /**
     * Virgülle ayrılmış String metni List<String> yapısına dönüştürür.
     * Örn: "BTTH-2026-0004,BGVL-2026-0002" -> ["BTTH-2026-0004", "BGVL-2026-0002"]
     */
    private List<String> stringToList(String str) {
        if (str == null || str.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.stream(str.split(","))
                .map(String::trim)
                .filter(item -> !item.isEmpty())
                .toList();
    }
}