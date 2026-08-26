package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pr_problemler")
public class PrEntity {

    @Id
    private String id; // Örn: PR-2026-0001

    @Column(nullable = false)
    private String baslik;

    @Column(length = 2000)
    private String aciklama;

    @Column(length = 2000)
    private String kokNeden;

    @Column(length = 2000)
    private String geciciCozum;

    @Column(nullable = false)
    private String etki;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Oncelik oncelik;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrDurum durum;

    /**
     * Süreç pratikliği ve hızlı geliştirme amacıyla ilişkili kayıt ID'leri (BTTH / BGVL)
     * ayrı bir tabloda tutulmak yerine veritabanında virgülle ayrılmış tek bir metin (String) olarak saklanır.
     * Örn: "BTTH-2026-0004,BGVL-2026-0002"
     * Bu metin Mapper katmanında List<String> veri yapısına dönüştürülür.
     */
    @Column(length = 1000)
    private String iliskiliKayitlar;

    private String sorumlu;

    @Column(nullable = false)
    private LocalDate olusturmaTarihi;

    private LocalDate kapanisTarihi;

    public PrEntity() {
    }

    public PrEntity(String id, String baslik, String aciklama, String kokNeden, String geciciCozum, 
                    String etki, Oncelik oncelik, PrDurum durum, String iliskiliKayitlar, 
                    String sorumlu, LocalDate olusturmaTarihi, LocalDate kapanisTarihi) {
        this.id = id;
        this.baslik = baslik;
        this.aciklama = aciklama;
        this.kokNeden = kokNeden;
        this.geciciCozum = geciciCozum;
        this.etki = etki;
        this.oncelik = oncelik;
        this.durum = durum;
        this.iliskiliKayitlar = iliskiliKayitlar;
        this.sorumlu = sorumlu;
        this.olusturmaTarihi = olusturmaTarihi;
        this.kapanisTarihi = kapanisTarihi;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBaslik() { return baslik; }
    public void setBaslik(String baslik) { this.baslik = baslik; }

    public String getAciklama() { return aciklama; }
    public void setAciklama(String aciklama) { this.aciklama = aciklama; }

    public String getKokNeden() { return kokNeden; }
    public void setKokNeden(String kokNeden) { this.kokNeden = kokNeden; }

    public String getGeciciCozum() { return geciciCozum; }
    public void setGeciciCozum(String geciciCozum) { this.geciciCozum = geciciCozum; }

    public String getEtki() { return etki; }
    public void setEtki(String etki) { this.etki = etki; }

    public Oncelik getOncelik() { return oncelik; }
    public void setOncelik(Oncelik oncelik) { this.oncelik = oncelik; }

    public PrDurum getDurum() { return durum; }
    public void setDurum(PrDurum durum) { this.durum = durum; }

    public String getIliskiliKayitlar() { return iliskiliKayitlar; }
    public void setIliskiliKayitlar(String iliskiliKayitlar) { this.iliskiliKayitlar = iliskiliKayitlar; }

    public String getSorumlu() { return sorumlu; }
    public void setSorumlu(String sorumlu) { this.sorumlu = sorumlu; }

    public LocalDate getOlusturmaTarihi() { return olusturmaTarihi; }
    public void setOlusturmaTarihi(LocalDate olusturmaTarihi) { this.olusturmaTarihi = olusturmaTarihi; }

    public LocalDate getKapanisTarihi() { return kapanisTarihi; }
    public void setKapanisTarihi(LocalDate kapanisTarihi) { this.kapanisTarihi = kapanisTarihi; }
}