package com.sirket.btth_api.btth;

import java.time.LocalDate;

public record BtthGuncelleRequest(
    String baslik,
    String aciklama,
    String birim,
    String oncelik,
    String durum,
    String atanan,
    LocalDate hedefTarih
) {}