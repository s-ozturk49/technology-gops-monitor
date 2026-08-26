package com.sirket.btth_api.bgvl;

import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class BgvlMapper {

    public BgvlDto toDto(BgvlEntity entity) {
        if (entity == null) {
            return null;
        }

        // Türetilmiş State Hesabı: SLA tarihi geçmişse VE zafiyet KAPANDI durumunda değilse gecikmiştir.
        boolean gecikmisMi = entity.getSlaTarihi() != null 
                && entity.getSlaTarihi().isBefore(LocalDate.now()) 
                && entity.getDurum() != BgvlDurum.KAPANDI;

        return new BgvlDto(
            entity.getId(),
            entity.getBaslik(),
            entity.getAciklama(),
            entity.getCve(),
            entity.getCvssSkoru(),
            entity.getKritiklik(),
            entity.getEtkilenenVarlik(),
            entity.getKaynak(),
            entity.getDurum(),
            entity.getTespitTarihi(),
            entity.getSlaTarihi(),
            entity.getSorumlu(),
            gecikmisMi
        );
    }

    public BgvlEntity toEntity(BgvlOlusturRequest istek, String yeniId) {
        if (istek == null) {
            return null;
        }

        BgvlEntity entity = new BgvlEntity();
        entity.setId(yeniId);
        entity.setBaslik(istek.baslik());
        entity.setAciklama(istek.aciklama());
        entity.setCve(istek.cve());
        entity.setCvssSkoru(istek.cvssSkoru());
        entity.setKritiklik(istek.kritiklik());
        entity.setEtkilenenVarlik(istek.etkilenenVarlik());
        entity.setKaynak(istek.kaynak());
        entity.setDurum(BgvlDurum.ACIK); // Yeni zafiyat kaydı varsayılan olarak ACIK başlar
        entity.setTespitTarihi(istek.tespitTarihi());
        entity.setSlaTarihi(istek.slaTarihi());
        entity.setSorumlu(istek.sorumlu());

        return entity;
    }
}