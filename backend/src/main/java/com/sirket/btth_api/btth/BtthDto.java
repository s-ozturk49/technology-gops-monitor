package com.sirket.btth_api.btth;

import java.time.LocalDate;

public record BtthDto(
    String id,
    String baslik,
    String aciklama,
    String talepEden,
    String birim,
    String oncelik,
    String durum,
    String atanan,
    LocalDate olusturmaTarihi,
    LocalDate hedefTarih
) {}