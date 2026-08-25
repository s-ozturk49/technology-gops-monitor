package com.sirket.btth_api.btth;

public enum BtthDurum {
    YENI("Yeni"),
    INCELEMEDE("İncelemede"),
    ONAY_BEKLIYOR("Onay Bekliyor"),
    TAMAMLANDI("Tamamlandı"),
    REDDEDILDI("Reddedildi");

    private final String etiket;

    BtthDurum(String etiket) {
        this.etiket = etiket;
    }

    public String getEtiket() {
        return etiket;
    }
}