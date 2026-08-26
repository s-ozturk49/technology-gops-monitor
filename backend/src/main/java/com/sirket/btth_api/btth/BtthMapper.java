package com.sirket.btth_api.btth;

import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class BtthMapper {

    // Entity -> DTO dönüşümü (Enum değerleri .name() ile String yapılır)
    public BtthDto toDto(BtthEntity e) {
        if (e == null) return null;

        return new BtthDto(
            e.getId(),
            e.getBaslik(),
            e.getAciklama(),
            e.getTalepEden(),
            e.getBirim(),
            e.getOncelik() != null ? e.getOncelik().name() : null,
            e.getDurum() != null ? e.getDurum().name() : null,
            e.getAtanan(),
            e.getOlusturmaTarihi(),
            e.getHedefTarih()
        );
    }

    // Request -> Entity dönüşümü
    public BtthEntity toEntity(BtthOlusturRequest r, String id) {
        var e = new BtthEntity();
        e.setId(id);
        e.setBaslik(r.baslik());
        e.setAciklama(r.aciklama());
        e.setTalepEden(r.talepEden());
        e.setBirim(r.birim());
        e.setOncelik(Oncelik.valueOf(r.oncelik().toUpperCase()));
        e.setDurum(BtthDurum.YENI);
        e.setOlusturmaTarihi(LocalDate.now());
        e.setHedefTarih(r.hedefTarih());
        return e;
    }
}