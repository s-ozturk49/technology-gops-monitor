package com.sirket.btth_api.btth;

import com.sirket.btth_api.repository.BtthInMemoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BtthService {

    private final BtthInMemoryRepository repository;

    public BtthService(BtthInMemoryRepository repository) {
        this.repository = repository;
    }

    public List<BtthDto> hepsiniGetir() {
        return repository.hepsi();
    }

    public BtthDto getir(String id) {
        return repository.bul(id)
            .orElseThrow(() -> new KayitBulunamadiException("BTTH", id));
    }

    public BtthDto olustur(BtthOlusturRequest istek) {
        var yeni = new BtthDto(
            repository.yeniId(),
            istek.baslik(),
            istek.aciklama(),
            istek.talepEden(),
            istek.birim(),
            istek.oncelik(),
            "YENI", // İş kuralı: Yeni kayıt her zaman YENI durumuyla başlar
            null,   // Otomatik atama yok
            LocalDate.now(),
            istek.hedefTarih()
        );
        return repository.kaydet(yeni);
    }

    public BtthDto guncelle(String id, BtthGuncelleRequest istek) {
        BtthDto mevcut = getir(id); // Kayıt yoksa KayitBulunamadiException fırlatır

        BtthDto guncellenmis = new BtthDto(
            mevcut.id(),
            istek.baslik(),
            istek.aciklama(),
            mevcut.talepEden(), // Talep eden bilgisi değiştirilemez
            istek.birim(),
            istek.oncelik(),
            istek.durum(),
            istek.atanan(),
            mevcut.olusturmaTarihi(), // İlk oluşturma tarihi sabit kalır
            istek.hedefTarih()
        );
        return repository.kaydet(guncellenmis);
    }

    public boolean sil(String id) {
        getir(id); // Önce kaydın varlığını doğrula
        return repository.sil(id);
    }
}