package com.sirket.btth_api.bgvl;

import com.sirket.btth_api.btth.KayitBulunamadiException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BgvlService {

    private final BgvlRepository repository;
    private final BgvlMapper mapper;

    public BgvlService(BgvlRepository repository, BgvlMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Page<BgvlDto> ara(String q, BgvlDurum durum, Kritiklik kritiklik, BgvlKaynak kaynak, int sayfa, int boyut, String sirala) {
        String[] siralaParcalari = sirala.split(",");
        String alan = siralaParcalari[0];
        Sort.Direction yon = (siralaParcalari.length > 1 && siralaParcalari[1].equalsIgnoreCase("asc"))
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(sayfa, boyut, Sort.by(yon, alan));
        Specification<BgvlEntity> spec = BgvlSpecification.filtrele(q, durum, kritiklik, kaynak);

        return repository.findAll(spec, pageable).map(mapper::toDto);
    }

    public List<BgvlDto> hepsiniGetir() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .toList();
    }

    public BgvlDto getir(String id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new KayitBulunamadiException("BGVL", id));
    }

    public BgvlDto olustur(BgvlOlusturRequest istek) {
        // Yeni ID üretimi (Örn: BGVL-2026-0001)
        String yeniId = "BGVL-2026-" + String.format("%04d", repository.count() + 1);

        BgvlEntity entity = mapper.toEntity(istek, yeniId);
        BgvlEntity kaydedilen = repository.save(entity);
        return mapper.toDto(kaydedilen);
    }

    public BgvlDto guncelle(String id, BgvlGuncelleRequest istek) {
        BgvlEntity mevcut = repository.findById(id)
                .orElseThrow(() -> new KayitBulunamadiException("BGVL", id));

        mevcut.setBaslik(istek.baslik());
        mevcut.setAciklama(istek.aciklama());
        mevcut.setCve(istek.cve());
        mevcut.setCvssSkoru(istek.cvssSkoru());
        mevcut.setKritiklik(istek.kritiklik());
        mevcut.setEtkilenenVarlik(istek.etkilenenVarlik());
        mevcut.setKaynak(istek.kaynak());
        if (istek.durum() != null) {
            mevcut.setDurum(istek.durum());
        }
        mevcut.setTespitTarihi(istek.tespitTarihi());
        mevcut.setSlaTarihi(istek.slaTarihi());
        mevcut.setSorumlu(istek.sorumlu());

        BgvlEntity guncellenmis = repository.save(mevcut);
        return mapper.toDto(guncellenmis);
    }

    public boolean sil(String id) {
        if (!repository.existsById(id)) {
            throw new KayitBulunamadiException("BGVL", id);
        }
        repository.deleteById(id);
        return true;
    }
}