package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import java.time.LocalDate;
import java.util.List;

public class PrResponseDto {

    private String id;
    private String baslik;
    private String aciklama;
    private String kokNeden;
    private String geciciCozum;
    private String etki;
    private Oncelik oncelik;
    private PrDurum durum;
    private List<String> iliskiliKayitlar;
    private String sorumlu;
    private LocalDate olusturmaTarihi;
    private LocalDate kapanisTarihi;

    public PrResponseDto() {
    }

    public PrResponseDto(String id, String baslik, String aciklama, String kokNeden, String geciciCozum, 
                         String etki, Oncelik oncelik, PrDurum durum, List<String> iliskiliKayitlar, 
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

    public List<String> getIliskiliKayitlar() { return iliskiliKayitlar; }
    public void setIliskiliKayitlar(List<String> iliskiliKayitlar) { this.iliskiliKayitlar = iliskiliKayitlar; }

    public String getSorumlu() { return sorumlu; }
    public void setSorumlu(String sorumlu) { this.sorumlu = sorumlu; }

    public LocalDate getOlusturmaTarihi() { return olusturmaTarihi; }
    public void setOlusturmaTarihi(LocalDate olusturmaTarihi) { this.olusturmaTarihi = olusturmaTarihi; }

    public LocalDate getKapanisTarihi() { return kapanisTarihi; }
    public void setKapanisTarihi(LocalDate kapanisTarihi) { this.kapanisTarihi = kapanisTarihi; }
}