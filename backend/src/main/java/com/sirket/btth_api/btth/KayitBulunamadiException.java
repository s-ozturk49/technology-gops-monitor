package com.sirket.btth_api.btth;

public class KayitBulunamadiException extends RuntimeException {
    public KayitBulunamadiException(String tip, String id) {
        super("%s nesnesi bulunamadı: %s".formatted(tip, id));
    }
}