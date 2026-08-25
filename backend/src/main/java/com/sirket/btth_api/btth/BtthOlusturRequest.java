package com.sirket.btth_api.btth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record BtthOlusturRequest(
    @NotBlank(message = "Başlık boş olamaz")
    String baslik,

    @NotBlank(message = "Açıklama boş olamaz")
    String aciklama,

    @NotBlank(message = "Talep eden kişi boş olamaz")
    String talepEden,

    @NotBlank(message = "Birim boş olamaz")
    String birim,

    @NotBlank(message = "Öncelik seçilmelidir")
    String oncelik,

    @NotNull(message = "Hedef tarih belirtilmelidir")
    LocalDate hedefTarih
) {}