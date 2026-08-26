package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class PrRequestDto {

    @NotBlank(message = "Başlık alanı boş bırakılamaz.")
    private String baslik;

    private String aciklama;
    private String kokNeden;
    private String geciciCozum;

    @NotBlank(message = "Etki alanı boş bırakılamaz.")
    private String etki;

    @NotNull(message = "Öncelik seçilmelidir.")
    private Oncelik oncelik;

    @NotNull(message = "Durum seçilmelidir.")
    private PrDurum durum;

    private List<String> iliskiliKayitlar;
    private String sorumlu;

    public PrRequestDto() {
    }

    public PrRequestDto(String baslik, String aciklama, String kokNeden, String geciciCozum, 
                        String etki, Oncelik oncelik, PrDurum durum, 
                        List<String> iliskiliKayitlar, String sorumlu) {
        this.baslik = baslik;
        this.aciklama = aciklama;
        this.kokNeden = kokNeden;
        this.geciciCozum = geciciCozum;
        this.etki = etki;
        this.oncelik = oncelik;
        this.durum = durum;
        this.iliskiliKayitlar = iliskiliKayitlar;
        this.sorumlu = sorumlu;
    }

    // Getters and Setters
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
}