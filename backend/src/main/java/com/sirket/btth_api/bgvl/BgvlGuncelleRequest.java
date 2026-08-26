package com.sirket.btth_api.bgvl;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record BgvlGuncelleRequest(
    @NotBlank(message = "Başlık boş olamaz")
    String baslik,

    String aciklama,

    String cve,

    @NotNull(message = "CVSS Skoru boş olamaz")
    @DecimalMin(value = "0.0", message = "CVSS Skoru en az 0.0 olabilir")
    @DecimalMax(value = "10.0", message = "CVSS Skoru en fazla 10.0 olabilir")
    Double cvssSkoru,

    @NotNull(message = "Kritiklik seviyesi seçilmelidir")
    Kritiklik kritiklik,

    @NotBlank(message = "Etkilenen varlık boş olamaz")
    String etkilenenVarlik,

    @NotNull(message = "Kaynak seçilmelidir")
    BgvlKaynak kaynak,

    BgvlDurum durum,

    @NotNull(message = "Tespit tarihi boş olamaz")
    LocalDate tespitTarihi,

    @NotNull(message = "SLA tarihi boş olamaz")
    LocalDate slaTarihi,

    String sorumlu
) {}