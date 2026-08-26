package com.sirket.btth_api.btth;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "btth_talep")
public class BtthEntity {

    @Id
    private String id;

    @Column(nullable = false, length = 120)
    private String baslik;

    @Column(nullable = false, length = 2000)
    private String aciklama;

    @Column(nullable = false)
    private String talepEden;

    @Column(nullable = false)
    private String birim;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Oncelik oncelik;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BtthDurum durum;

    private String atanan;

    @Column(nullable = false)
    private LocalDate olusturmaTarihi;

    private LocalDate hedefTarih;

    // JPA için zorunlu boş constructor
    protected BtthEntity() {}

    // Yeni nesne oluştururken kolaylık sağlayan constructor
    public BtthEntity(String id, String baslik, String aciklama, String talepEden, 
                      String birim, Oncelik oncelik, BtthDurum durum, 
                      String atanan, LocalDate olusturmaTarihi, LocalDate hedefTarih) {
        this.id = id;
        this.baslik = baslik;
        this.aciklama = aciklama;
        this.talepEden = talepEden;
        this.birim = birim;
        this.oncelik = oncelik;
        this.durum = durum;
        this.atanan = atanan;
        this.olusturmaTarihi = olusturmaTarihi;
        this.hedefTarih = hedefTarih;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBaslik() { return baslik; }
    public void setBaslik(String baslik) { this.baslik = baslik; }

    public String getAciklama() { return aciklama; }
    public void setAciklama(String aciklama) { this.aciklama = aciklama; }

    public String getTalepEden() { return talepEden; }
    public void setTalepEden(String talepEden) { this.talepEden = talepEden; }

    public String getBirim() { return birim; }
    public void setBirim(String birim) { this.birim = birim; }

    public Oncelik getOncelik() { return oncelik; }
    public void setOncelik(Oncelik oncelik) { this.oncelik = oncelik; }

    public BtthDurum getDurum() { return durum; }
    public void setDurum(BtthDurum durum) { this.durum = durum; }

    public String getAtanan() { return atanan; }
    public void setAtanan(String atanan) { this.atanan = atanan; }

    public LocalDate getOlusturmaTarihi() { return olusturmaTarihi; }
    public void setOlusturmaTarihi(LocalDate olusturmaTarihi) { this.olusturmaTarihi = olusturmaTarihi; }

    public LocalDate getHedefTarih() { return hedefTarih; }
    public void setHedefTarih(LocalDate hedefTarih) { this.hedefTarih = hedefTarih; }
}