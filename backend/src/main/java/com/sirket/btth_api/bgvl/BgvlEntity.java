package com.sirket.btth_api.bgvl;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bgvl_zafiyetler")
public class BgvlEntity {

    @Id
    private String id; // Örn: BGVL-2026-0001

    @Column(nullable = false)
    private String baslik;

    @Column(length = 2000)
    private String aciklama;

    private String cve; // Örn: CVE-2026-1234

    @Column(nullable = false)
    private Double cvssSkoru; // 0.0 - 10.0

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Kritiklik kritiklik;

    @Column(nullable = false)
    private String etkilenenVarlik;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BgvlKaynak kaynak;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BgvlDurum durum;

    @Column(nullable = false)
    private LocalDate tespitTarihi;

    @Column(nullable = false)
    private LocalDate slaTarihi;

    private String sorumlu;

    public BgvlEntity() {
    }

    public BgvlEntity(String id, String baslik, String aciklama, String cve, Double cvssSkoru, 
                      Kritiklik kritiklik, String etkilenenVarlik, BgvlKaynak kaynak, 
                      BgvlDurum durum, LocalDate tespitTarihi, LocalDate slaTarihi, String sorumlu) {
        this.id = id;
        this.baslik = baslik;
        this.aciklama = aciklama;
        this.cve = cve;
        this.cvssSkoru = cvssSkoru;
        this.kritiklik = kritiklik;
        this.etkilenenVarlik = etkilenenVarlik;
        this.kaynak = kaynak;
        this.durum = durum;
        this.tespitTarihi = tespitTarihi;
        this.slaTarihi = slaTarihi;
        this.sorumlu = sorumlu;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBaslik() { return baslik; }
    public void setBaslik(String baslik) { this.baslik = baslik; }

    public String getAciklama() { return aciklama; }
    public void setAciklama(String aciklama) { this.aciklama = aciklama; }

    public String getCve() { return cve; }
    public void setCve(String cve) { this.cve = cve; }

    public Double getCvssSkoru() { return cvssSkoru; }
    public void setCvssSkoru(Double cvssSkoru) { this.cvssSkoru = cvssSkoru; }

    public Kritiklik getKritiklik() { return kritiklik; }
    public void setKritiklik(Kritiklik kritiklik) { this.kritiklik = kritiklik; }

    public String getEtkilenenVarlik() { return etkilenenVarlik; }
    public void setEtkilenenVarlik(String etkilenenVarlik) { this.etkilenenVarlik = etkilenenVarlik; }

    public BgvlKaynak getKaynak() { return kaynak; }
    public void setKaynak(BgvlKaynak kaynak) { this.kaynak = kaynak; }

    public BgvlDurum getDurum() { return durum; }
    public void setDurum(BgvlDurum durum) { this.durum = durum; }

    public LocalDate getTespitTarihi() { return tespitTarihi; }
    public void setTespitTarihi(LocalDate tespitTarihi) { this.tespitTarihi = tespitTarihi; }

    public LocalDate getSlaTarihi() { return slaTarihi; }
    public void setSlaTarihi(LocalDate slaTarihi) { this.slaTarihi = slaTarihi; }

    public String getSorumlu() { return sorumlu; }
    public void setSorumlu(String sorumlu) { this.sorumlu = sorumlu; }
}