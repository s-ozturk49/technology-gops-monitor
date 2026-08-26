package com.sirket.btth_api.btth;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BtthService {

    private final BtthRepository repository;
    private final BtthMapper mapper;

    public BtthService(BtthRepository repository, BtthMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<BtthDto> hepsiniGetir() {
        return repository.findAll().stream()
            .map(mapper::toDto)
            .toList();
    }

    public BtthDto getir(String id) {
        return repository.findById(id)
            .map(mapper::toDto)
            .orElseThrow(() -> new KayitBulunamadiException("BTTH", id));
    }

    public BtthDto olustur(BtthOlusturRequest istek) {
        // Yeni ID üretimi (Örn: BTTH-2026-0001)
        String yeniId = "BTTH-2026-" + String.format("%04d", repository.count() + 1);
        
        BtthEntity entity = mapper.toEntity(istek, yeniId);
        BtthEntity kaydedilen = repository.save(entity);
        return mapper.toDto(kaydedilen);
    }

    public BtthDto guncelle(String id, BtthGuncelleRequest istek) {
        BtthEntity mevcut = repository.findById(id)
            .orElseThrow(() -> new KayitBulunamadiException("BTTH", id));

        mevcut.setBaslik(istek.baslik());
        mevcut.setAciklama(istek.aciklama());
        mevcut.setBirim(istek.birim());
        mevcut.setOncelik(Oncelik.valueOf(istek.oncelik().toUpperCase()));
        if (istek.durum() != null) {
            mevcut.setDurum(BtthDurum.valueOf(istek.durum().toUpperCase()));
        }
        mevcut.setAtanan(istek.atanan());
        mevcut.setHedefTarih(istek.hedefTarih());

        BtthEntity guncellenmis = repository.save(mevcut);
        return mapper.toDto(guncellenmis);
    }

    public boolean sil(String id) {
        if (!repository.existsById(id)) {
            throw new KayitBulunamadiException("BTTH", id);
        }
        repository.deleteById(id);
        return true;
    }
}