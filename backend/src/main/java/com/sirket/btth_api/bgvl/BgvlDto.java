package com.sirket.btth_api.bgvl;

import java.time.LocalDate;

public record BgvlDto(
    String id,
    String baslik,
    String aciklama,
    String cve,
    Double cvssSkoru,
    Kritiklik kritiklik,
    String etkilenenVarlik,
    BgvlKaynak kaynak,
    BgvlDurum durum,
    LocalDate tespitTarihi,
    LocalDate slaTarihi,
    String sorumlu,
    boolean gecikmisMi // Veritabanında saklanmayan, türetilmiş alan
) {}